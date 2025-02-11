"use client";
import {
  CustomBreadCrumb,
  CustomButton,
  CustomInput,
} from "@/components/custom-components";
import { B1, BMiddle, H2, BMiddleRegular, BodySmallestMedium, B1Regular } from "@/components/custom-typography";

import React, { useEffect, useState } from "react";
// import { getWorkRequestById, createInvoices, getInvoiceById, getInvoices, sentToClient, uploadResponseClient } from "@/config/api";
import { fetchSingleShipmentRequest, createInvoiceShipment } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

// import { formatCurrency } from "@/utils/helper";
import Link from 'next/link';
import { toast } from "@/hooks/use-toast";
import Image from 'next/image'


const breadCrumb = [
  {
    label: "Home",
    link: "/dashboard/admin",
  },
  {
    label: "Shipment",
    link: "/dashboard/admin/shipment",
  },
  {
    label: "Invoices",
  },
];

interface CreateInvoiceDetailsProps {
  id: string;
}



type Items = {
  name: string;
  quantity: string;
  value: string;
  weight: string;
}

interface CreateInvoicesForm {
  shipment_id: number;
  invoiceItem: Items[];
  additional_cost: number | any;
  currency: string;
}


export function CreateInvoice({ id }: CreateInvoiceDetailsProps) {

  const { data: shipmentData, isLoading: isLoadingShipment, isError: isErrorUsers, error: shipmentsError } = useQuery({
    queryKey: ["singleShipments", id],
    queryFn: () => fetchSingleShipmentRequest(parseInt(id)),
    refetchOnWindowFocus: false, // avoid refetching on window focus
    staleTime: 0, // data becomes stale immediately for refetching
  });

  const [invoiceForm, setInvoiceForm] = useState<CreateInvoicesForm>({
    shipment_id: shipmentData?.id || 0,
    invoiceItem: [],
    additional_cost: "",
    currency: "USD"
  });

  const [clientCost, setClientCost] = useState("");

  const handleClientCostChange = (value: string) => {
    console.log("New value:", value);

    setInvoiceForm((prevForm) => ({
      ...prevForm,
      shipment_id: shipmentData?.id,
      additional_cost: parseFloat(value)
    }));
  };



  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  const formatValue = (value: number): string => {
    return value.toLocaleString("en-US");
  };

  const saveInvoices = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setLoading(true);
    console.log("object food", invoiceForm);
    try {
      const { data } = await createInvoiceShipment(invoiceForm);

      console.log("response for invoice ..", data);

      console.log("data invoice..");

      if (data) {

        toast({
          title: "Success",
          description: `${data?.message}🎉`,
          variant: "destructive",
        });
      }
      setLoading(false);
      window.location.reload();


    } catch (error: any) {
      if (error) {
        console.error("An unexpected error occurred:", error);
        if (error.response.status == 404) {
          toast({
            title: "Error",
            description: "User not Found, please check credentials",
            variant: "destructive",
          });

        } else if (error.response.status == 401) {
          toast({
            title: "Error",
            description: "Invalid Credentials",
            variant: "destructive",
          });

        } else if (error.request) {
          toast({
            title: "Error",
            description: "Network appears to be slow, Check connection 😢",
            variant: "destructive",
          });

        } else {
          toast({
            title: "Error",
            description: "An unexpected error occurred",
            variant: "destructive",
          });
        }
      }
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (shipmentData) {
      setInvoiceForm((prevForm) => ({
        ...prevForm,
        shipment_id: shipmentData.id,
        invoiceItem: shipmentData.items.map((item: any) => ({
          name: item.name,
          quantity: parseInt(item?.quantity),
          value: parseFloat(item?.value),
          weight: parseFloat(item?.weight),
        })),
        currency: "USD",
      }));
    }
  }, [shipmentData]);
  




  return (
    <div>
      <div className="mb-[14px] flex items-center justify-between">
        <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
      </div>
      <H2 className="my-[36px] font-semibold text-primary">
        Generate Invoices
      </H2>

      <div className="bg-white shadow-md rounded-[20px] py-[30px]">
        <div className="overflow-x-auto">
          <div>
            <table className="min-w-full">
              <thead className="text-[#8D8D8D] font-[500] lg:text-[1rem] text-xs whitespace-nowrap bg-[#ECECEC]">
                <tr className="text-left">
                  <th className="px-4 py-2 font-[500]">#</th>
                  <th className="px-4 py-2 font-[500]">Item</th>
                  <th className="px-4 py-2 font-[500]">Quantity</th>
                  <th className="px-4 py-2 font-[500]">Cost</th>
                  <th className="px-4 py-2 font-[500]">Weight</th>
                </tr>
              </thead>

              <tbody className="">
                {shipmentData &&
                  (
                    shipmentData?.items?.map((item: any, index: number) => (
                      <tr key={index} className="text-[1rem] font-[500] align-top">
                        {/* Example Columns */}
                        <td className="px-6 py-4">
                          <BodySmallestMedium className="!text-[12px]">
                            {index + 1}
                          </BodySmallestMedium>
                        </td>

                        <td className="px-6 py-4">
                          <div>
                            <B1 className="!text-[0.875rem] !text-gray-500">
                              <BodySmallestMedium className="!text-[13px]">
                                {item.name || "No Name"}
                              </BodySmallestMedium>
                            </B1>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <BodySmallestMedium className="!text-[13px] !text-gray-500">
                            {item.quantity?.toLocaleString() || "0"}
                          </BodySmallestMedium>
                        </td>

                        <td className="px-6 py-4">
                          <BodySmallestMedium className="!text-[13px]">
                            ${parseFloat(item?.value) || "0"}
                          </BodySmallestMedium>
                        </td>

                        <td className="px-6 py-4">
                          <BodySmallestMedium className="!text-[13px]">
                            {(item?.weight) || "0"}KG
                          </BodySmallestMedium>
                        </td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-[36px] py-[43px]">
              <B1>
                <div className="!text-[13px] text-gray-800 my-2">Additional Cost:</div>
                {
                  shipmentData?.status?.code === '01' ? 
                  <CustomInput
                    required
                    setValue={(value) => handleClientCostChange(value as string)}
                    value={invoiceForm.additional_cost} // Use the value from the array
                    type="number"
                    showLabel={false}
                    label={"Cost"}
                    className="!h-[38px] !w-[140px] !px-[0px] !text-[0.875rem]"
                  />
                  : 
                  <div>${shipmentData?.invoice?.additional_cost}</div>
                }
              </B1>

              {/* <div className="flex justify-center items-center">
                <div>Total:</div>
                
              </div> */}
            </div>

            <div className="flex justify-center">
              {/* <CustomButton
                className="!py-[0px] !w-[139px] !h-[48px] !text-[0.875rem] bg-primary text-white"
                onClick={saveInvoices}
                disabled={loading}
              >
                Save
              </CustomButton> */}

              {/* <div>{shipmentData?.status?.code}</div> */}
              {
                shipmentData?.status?.code === '01' &&
                  <CustomButton
                    onClick={saveInvoices}
                    disabled={loading}
                    type="submit" // Explicitly set as "submit"
                    className="!py-[0px] !w-[139px] !h-[48px] !text-[0.875rem] bg-primary text-white text-center"
                  >
                    <div>
                      {loading ? ( // Display spinner if userLoading is true
                        <div className="flex justify-center items-center px-6">
                          <div>

                            <Image
                              src={'/images/Spinner.svg'}
                              alt="logo"
                              width={60}
                              height={60}
                              priority
                              className="text-[1px] md:w-full md:h-full xs:w-full xs:h-full"
                            />

                          </div>
                        </div>
                      ) : (
                        <div className='flex justify-center'>

                          <span className="ml-0">Save</span>
                        </div>
                      )}
                    </div>
                  </CustomButton>
                  
              }
              {
                shipmentData?.status?.code === '05' &&
                  <CustomButton
                    className="!py-[0px] !w-[139px] !h-[48px] !text-[0.875rem] bg-white !text-primary border-[1px] border-primary"
                  // onClick={saveInvoices}
                  // disabled={loading}
                  >
                    Message To Client
                  </CustomButton>
              }
              {
                (shipmentData?.status?.code !== '01' && shipmentData?.status?.code !== '05') &&
                <CustomButton
                  className="!py-[0px] !w-[139px] !h-[48px] !text-[0.875rem] bg-rose-600 text-white"
                // onClick={saveInvoices}
                // disabled={loading}
                >
                  Print
                </CustomButton>
              }

              

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
