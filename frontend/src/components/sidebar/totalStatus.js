import React from "react";

const TotalStatus = ({ totalStatus }) => {
  console.log("Total Status", totalStatus.each_noshow);

  return (
    <div className="total-status">
      <div className="total-status-title">Summary</div>
      {totalStatus.map((item) => (

        <fieldset>
          <div>
            Total No-show: <span className="total-status-content" > {item.each_noshow}</span>

          </div>

          <div>
            Total savings:<span className="total-status-content">{item.saving}</span>

          </div>
        </fieldset>
      ))}


    </div>
  )
}

export default TotalStatus;