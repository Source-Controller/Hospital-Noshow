from rest_framework import generics, status, views, permissions
from rest_framework.decorators import api_view, permission_classes
from .serializers import RegisterSerializer, LoginSerializer, LogoutSerializer, UserSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
# import stripe
from django.conf import settings
from rest_framework.views import APIView
# from openai import OpenAI
from rest_framework.permissions import IsAuthenticated, AllowAny
import json
from urllib.parse import urlencode
from rest_framework import serializers
from rest_framework.response import Response
from .models import User
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.shortcuts import redirect, render
from django.contrib import messages
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.core.mail import send_mail
from django.http import JsonResponse

from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
from collections import defaultdict
import pandas as pd
import random
from django.core.exceptions import ObjectDoesNotExist
import os
import csv
#from .models import Feedback

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        file_path = 'json_file.json'
        with open(file_path) as file:
            json_data = json.load(file)
        
        data = json.dumps(json_data)

        user = request.data
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        res_data = {
            "user_info": user_data,
            "json_data": data
        }
        return Response(res_data, status=status.HTTP_201_CREATED)


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        file_path = 'json_file.json'
        with open(file_path) as file:
            json_data = json.load(file)
        
        data = json.dumps(json_data)

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        print(serializer.data, "is_super")

        res_data = {
            "user_info": serializer.data,
            "json_data": data
        }

        # if(serializer.data['is_superuser']):
        #     return Response(serializer.data, status=status.HTTP_200_OK)
        # else:
        return Response(res_data, status=status.HTTP_200_OK)



class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"a": "success"}, status=status.HTTP_204_NO_CONTENT)
    
class EventsView(APIView):
    def post(self, request):
        request_userdata = request.data.get('userdata')
        username = request_userdata.get('username')
        request_mark = request.data.get('mark')
        request_pat_enc_csn_id = request.data.get('pat_enc_csn_id')
        if request_mark == 2:
            request_mark = 1
        
        elif request_mark == 1:
            request_mark = 0
        
        json_data = {
            "Username": username,
            "Cancel": request_mark,
            "pat_enc_csn_id": request_pat_enc_csn_id
        }

        csv_file_path = 'appt_change.csv'
        field_names = ['Username', 'Cancel', 'pat_enc_csn_id']
        with open(csv_file_path, mode='a', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=field_names)
            if file.tell() == 0:  # Check if the file is empty
                writer.writeheader()
            file.seek(0,2)
            writer.writerow(json_data)

        return Response({'success': 'Feedback saved successfully'})
    
class FeedbackAPIView(APIView):
    def post(self, request):
        requested_username = request.data.get('username')
        msg = request.data.get('msg')
        rate = request.data.get('rate')
        print("requested_username" , requested_username)

        if requested_username:
            # Assuming you have a User model as defined above
            try:
                m_user = User.objects.get(username=requested_username)
                # m_user = {}
                print(m_user)
            except ObjectDoesNotExist:
                return Response({'error': 'User does not exist'}, status=404)

            if msg:
                m_user.msg = msg
            if rate:
                m_user.rate = rate

            m_user.save()

            return Response({'success': 'Feedback saved successfully'}, status=200)
        else:
            return Response({'error': 'Username not provided'}, status=400)
        
class GetestimateView(APIView):
    def get(self, request, *args, **kwargs):
        users_with_msg_rate = User.objects.exclude(msg__isnull=True).exclude(msg__isnull=True)
        serializer = UserSerializer(users_with_msg_rate, many=True)
        return Response({'users':users_with_msg_rate.values()}, status=200)

class DepartmentDetailView(APIView):
    def get(self, endpoint):
        
        json_file_path = os.path.join(settings.BASE_DIR, 'json_file.json')
        with open(json_file_path) as json_file:
            data = json.load(json_file)

        print(data)
        print(endpoint)
        return JsonResponse(data)

class CsvView(APIView):
    def post(self, request): 
        excel_file = request.FILES['file']

        ######### save all data tag
        # df = pd.read_excel(excel_file)
        # df.dropna(how='all', inplace=True)
        # # datatag = wb.parse("data")
        # datatag=df.to_dict(orient='records')
        # json_file_data = 'data.json'
        # with open(json_file_data, 'w') as json_file_data:
        #     json.dump(datatag, json_file_data, indent=4)
        
        #############################
     
        wb = pd.ExcelFile(excel_file)
        data = wb.parse("data")
        prediction = wb.parse("prediction")

        # Convert DataFrame to CSV format without headers or index
        data = data.to_dict()
        pat_id = list(data['pat_id'].values())
        pat_name = list(data['pat_name'].values())
        sex = list(data['sex'].values())
        birth_date = list(data['birth_date'].values())
        race = list(data['race'].values())
        ethnic_group = list(data['ethnic_group'].values())
        marital_status = list(data['marital_status'].values())
        religion = list(data['religion'].values())
        language = list(data['language'].values())
        contact_date = list(data['contact_date'].values())
        department_name = list(data['department_name'].values())
        dept_specialty_name = list(data['dept_specialty_name'].values())
        pat_enc_csn_id = list(data['pat_enc_csn_id'].values())
        appt_dttm = list(data['appt_dttm'].values())
        appt_made_dttm = list(data['appt_made_dttm'].values())
        appt_made_date = list(data['appt_made_date'].values())
        noshow = list(data['noshow'].values())
        appt_status_name = list(data['appt_status_name'].values())
        noshow_pred = list(data['noshow_pred(0/1)'].values())
        noshow_pred_probability = list(
            data['noshow_pred_probability'].values())
        contact_date = [datetime.strftime(
            date, "%Y-%m-%d") for date in contact_date]
        physician_username = list(data['physician_username'].values())
        appt_status_name = list(data['appt_status_name'].values())
        # physician_name = list(data['physician_name'].values())
        # physician_email = list(data['physician_email'].values())
        ###########  saving  ############
        saving = wb.parse("saving")
        saving = saving.to_dict()
        revenue = list(saving['revenue'].values())
        extra_effort = list(saving['extra_effort'].values())
        Saving = []
        if len(revenue) != len(extra_effort):
            print("Error: revenue and extra_effort lists have different lengths")
        else:
            for i in range(len(revenue)):
                annualsaving = {
                    "x": extra_effort[i],
                    "y": revenue[i]
                }
                Saving.append(annualsaving)
        annualsaving_json = json.dumps(
            {"annualsaving":Saving}, indent = 4
        )
    #calendar
        Calendar_Shows = []
        for i in range(len(physician_username)):
            # if i==0:
            #     continue
            Calendar_Show = {
                "title": appt_status_name[i],
                "pName" : pat_name[i],
                "paId": pat_id[i],
                "start": str(appt_dttm[i]),
                "end": str(appt_dttm[i]+timedelta(minutes=150)),
                "backgroundColor": 'orange' if appt_status_name[i] == 'noshow' or noshow_pred_probability[i] >= 0.6 else 'blue',
                'username': physician_username[i],
                "noshow_pred_probability":noshow_pred_probability[i],
                "pat_enc_csn_id": pat_enc_csn_id[i]
            }
            Calendar_Shows.append(Calendar_Show)
        Calendar_Shows_json = json.dumps(
            {"calendar_shows":Calendar_Shows}, indent = 4
        )
        ###############################################################

        ###banner ########
        banner = wb.parse("banner")
        banner = banner.to_dict()

        dep_name = list(banner['department_name'].values())
        each_noshow = list(banner['no_show'].values())
        each_saving = list(banner['saving'].values())
        print(each_noshow)

        banner_results = []

        for i in range(len(dep_name)):
            
            banner_result = {
                "department_name":dep_name[i],
                "each_noshow":each_noshow[i],
                "saving":each_saving[i]
            }
            banner_results.append(banner_result)

        banner_json = json.dumps({"totalStatus":banner_results}, indent=4)
        ###############
        noshow_pred_probabilityss = []

        for i in range(len(noshow_pred_probability)):
            if i == 0:
                continue
            noshow_pred_probabilitys = {
                "date": contact_date[i],
                "noshow_now": noshow[i],
                "noshow_pred": noshow_pred[i],
                "noshow_pred_prob": noshow_pred_probability[i],
                "department_name": dept_specialty_name[i],
            }
            noshow_pred_probabilityss.append(noshow_pred_probabilitys)

        noshow_pred_probability_json = json.dumps(
            {"noshow_pred_probability": noshow_pred_probabilityss}, indent=4)

        noshownumber = {"totalNoshows": noshow.count(1)}
        # apptstatus#######################
        app_status = appt_status_name

        # completed_counts = defaultdict(
        #     lambda: {"Completed": 0, "Arrived": 0, "Scheduled": 0})
        completed_counts = defaultdict(lambda: defaultdict(lambda: {"Completed": 0, "Arrived": 0, "Scheduled": 0}))


        for dep_name, date, status in zip(dept_specialty_name, contact_date, app_status):
            if status == "Completed":
                completed_counts[dep_name][date]["Completed"] += 1
            elif status == "Arrived":
                completed_counts[dep_name][date]["Arrived"] += 1
            elif status == "Scheduled":
                completed_counts[dep_name][date]["Scheduled"] += 1

        result = []
        # for depName, month, counts in completed_counts.items():
        #     result.append({
        #         "date": month,
        #         "Completed": counts["Completed"],
        #         "Arrived": counts["Arrived"],
        #         "Scheduled": counts["Scheduled"],
        #         "department_name": depName,
        #     })
        for depName, counts in completed_counts.items():
            for date, month_counts in counts.items():
                result.append({
                    "date": date,
                    "Completed": month_counts["Completed"],
                    "Arrived": month_counts["Arrived"],
                    "Scheduled": month_counts["Scheduled"],
                    "department_name": depName,
                })

        apptStatus = json.dumps({"apptStatus": result}, indent=4)
       
        ##################
        patients = []

        for i in range(len(pat_name)):
            if i == 0:
                continue
            patient = {
                "id": pat_id[i],
                "name": pat_name[i],
                "sex": sex[i],
                "birthday": str(birth_date[i]),
                "race": race[i],
                "ethnic_group": ethnic_group[i],
                "marital_status": marital_status[i],
                "religion": religion[i],
                "language": language[i],
                "contact_date": str(contact_date[i]),
                "department_name": department_name[i],
                "dept_specialty_name": dept_specialty_name[i],
                "physician_username" : physician_username[i]
            }
            patients.append(patient)

        patients_json = json.dumps({"patients": patients}, indent=4)
        apointments = []

        for i in range(len(pat_name)):
            if i == 0:
                continue
            apointment = {
                "pat_name": pat_name[i],
                "appt_made_dttm": str(appt_made_dttm[i]),
                "appt_made_date": str(appt_made_date[i]),
                "appt_status_name": appt_status_name[i],
                "department_name": department_name[i],
                "dept_specialty_name": dept_specialty_name[i]

            }
            apointments.append(apointment)

        apointments_json = json.dumps({"apointments": apointments}, indent=4)

        appnumber = {"apptAmount": str(len(pat_id))}

        weather = wb.parse("weather")
        weather = weather.to_dict()

        Day = list(weather['Day'].values())
        Date = list(weather['Date'].values())
        Location = list(weather['Location'].values())
        Temperature = list(weather['Temperature(C)'].values())
        Condition = list(weather['Weather_Condition'].values())
        weathers = []

        for i in range(len(Day)):
            if i == 0:
                continue
            weather = [
                Day[i], Date[i].strftime('%Y-%m-%d'), str(Location[i]), str(Temperature[i]), str(Condition[i])
            ]
            weathers.append(weather)

        weather_json = json.dumps({"weathers": weathers}, indent=4)

        prediction = wb.parse("prediction")
        prediction = prediction.to_dict()
        accuracy = list(prediction['accuracy'].values())
        accuracy = [round(num*100, 2) for num in accuracy]
        f1 = list(prediction['f1'].values())
        f1 = [round(num*100, 2) for num in f1]
        auprc = list(prediction['auprc'].values())
        auprc = [round(num*100, 2) for num in auprc]
        roc_auc = list(prediction['roc_auc'].values())
        roc_auc = [round(num*100, 2) for num in roc_auc]
        date1 = list(prediction['week_of'].values())
        date = [datetime.strftime(
            date, "%Y-%m-%d") for date in date1]

        colors = ["white", "red", "green", "blue",
                  "yellow", "purple", "orange", "black"]
        random_colors = random.sample(colors, k=8)

        accuracy = {
            "total": sum(accuracy)/len(accuracy),
            "accuracies": accuracy,
            "labels": date,
            "backgroundcolor": random_colors,
        }

        auroc = {
            "total": sum(roc_auc)/len(roc_auc),
            "auroc": roc_auc,
            "labels": date,
            "backgroundcolor": random_colors,
        }

        auprc = {
            "total": sum(auprc)/len(auprc),
            "auprc": auprc,
            "labels": date,
            "backgroundcolor": random_colors,
        }
        fscore = {
            "total": sum(f1)/len(f1),
            "fscore": f1,
            "labels": date,
            "backgroundcolor": random_colors,
        }

        accuracy = json.dumps({"accuracy": accuracy}, indent=4)
        fscore = json.dumps({"fscore": fscore}, indent=4)
        auprc = json.dumps({"auprc": auprc}, indent=4)
        auroc = json.dumps({"auroc": auroc}, indent=4)

        random_colors = random.sample(colors, k=8)
        # print(fscore)
        # print(auprc)
        # print(auroc)
        # print(accuracy)

        #calendar
        # dict1 = json.loads(merged_json)
        # dict2 = json.loads(Calendar_Shows_json)

        # final_merged_dict = {**dict1, **dict2}
        # final_merged_json = json.dumps(final_merged_dict)
        #calendar
        merge = noshow_pred_probability_json
        json_dict = json.loads(merge)

        json_dict["totalNoshows"] = noshow.count(1)
        json_dict["apptAmount"] = len(pat_name)

        updated_json = json.dumps(json_dict)

        dict1 = json.loads(updated_json)
        dict2 = json.loads(patients_json)

# Merge the two dictionaries
        merged_dict = {**dict1, **dict2}

# Convert the merged dictionary back to JSON
        merged_json = json.dumps(merged_dict)

        dict1 = json.loads(merged_json)
        dict2 = json.loads(apointments_json)

# Merge the two dictionaries
        merged_dict = {**dict1, **dict2}

# Convert the merged dictionary back to JSON
        merged_json = json.dumps(merged_dict)

        dict1 = json.loads(merged_json)
        dict2 = json.loads(weather_json)

# Merge the two dictionaries
        merged_dict = {**dict1, **dict2}

        merged_json = json.dumps(merged_dict)

        dict1 = json.loads(merged_json)
        dict2 = json.loads(apptStatus)

        merged_dict = {**dict1, **dict2}

        merged_json = json.dumps(merged_dict)

        dict1 = json.loads(merged_json)
        dict2 = json.loads(accuracy)
        merged_dict = {**dict1, **dict2}
        merged_json = json.dumps(merged_dict)

        dict1 = json.loads(merged_json)
        dict2 = json.loads(auprc)
        merged_dict = {**dict1, **dict2}
        merged_json = json.dumps(merged_dict)

        dict1 = json.loads(merged_json)
        dict2 = json.loads(auroc)
        merged_dict = {**dict1, **dict2}
        merged_json = json.dumps(merged_dict)

        dict1 = json.loads(merged_json)
        dict2 = json.loads(fscore)
        merged_dict = {**dict1, **dict2}
        merged_json = json.dumps(merged_dict)

# Merge the two dictionaries////annualsaving_json
        dict1 = json.loads(merged_json)
        dict2 = json.loads(annualsaving_json)
        merged_dict = {**dict1, **dict2}
# convert the merged dictionary back to json //annualsaving_json
        merged_json = json.dumps(merged_dict)

# cakcDATA
        
        dict1 = json.loads(merged_json)
        dict2 = json.loads(Calendar_Shows_json)
        merged_dict = {**dict1, **dict2}
        merged_json = json.dumps(merged_dict)

        # banner
        
        dict1 = json.loads(merged_json)
        dict2 = json.loads(banner_json)
        merged_dict = {**dict1, **dict2}
        merged_json = json.dumps(merged_dict)

        file_path = 'json_file.json'
        with open(file_path, 'w') as json_file:
            json_file.write(merged_json)

        return JsonResponse({"data": merged_json})
    