
import { CustomButton } from "@/components/custom-components";
import { B1, H2 } from "@/components/custom-typography";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ShipmentOverview from "./shipment-overview";
import ServiceOverview from "./service-overview";
import Resources from "./resources";

import FinancialOverview from "./financial-overview";



export function ImportDashboard() {
  

  return (
    <div className="w-[100%]">
      
      <div>
        <ShipmentOverview />
      </div>

      <div>
        <ServiceOverview />
      </div>

      <div>
        <FinancialOverview />
      </div>

      <div>
        <Resources />
      </div>

      
    </div>
  );
}

export default ImportDashboard;
