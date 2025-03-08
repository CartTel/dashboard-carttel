"use client";
import {
  CustomBreadCrumb,
  CustomButton,
  CustomInput,
  CustomSelect
} from "@/components/custom-components";
import { B1, BMiddle, H2, BMiddleRegular, BodySmallestMedium, B1Regular } from "@/components/custom-typography";

import React, { useEffect, useState, useMemo } from "react";

import { fetchSingleShipmentRequest, createInvoiceShipment, fetchSingleDropoffRequest, createInvoiceDropoff } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

// import { formatCurrency } from "@/utils/helper";
import Link from 'next/link';
import { toast } from "@/hooks/use-toast";
import Image from 'next/image'
import { SkeletonLoader } from '@/components/ui/skeletonCard';


const breadCrumb = [
  {
    label: "Home",
    link: "/dashboard/admin",
  },
  {
    label: "Dropoff",
    link: "/dashboard/admin/dropoff",
  },
  {
    label: "Invoices",
  },
];

interface CreateDropoffInvoiceDetailsProps {
  id: string;
}



type Items = {
  name: string;
  quantity: string;
  value: string;
  weight: string;
}

interface CreateDropoffInvoiceForm {
  dropoff_id: null,
  shipment_id: null,
  cost: any,
  trackingId: string,
  additional_cost: any,
  deliveryPlan: string,
  deliveryCompany: string,
  total: any
}


export function CreateDropoffInvoice({ id }: CreateDropoffInvoiceDetailsProps) {
  const [userString, setUserString] = useState(localStorage.getItem("roles"));
  const [loading, setLoading] = useState(false);
  const [shipmentId, setShipmentId] = useState("");

  const [dropoffForm, setDropoffForm] = useState<CreateDropoffInvoiceForm>({
    dropoff_id: null,
    shipment_id: null,
    cost: null,
    trackingId: "",
    additional_cost: null,
    deliveryPlan: "",
    deliveryCompany: "",
    total: null
  });

  const { data: dropoffData, isLoading: isLoadingDropoff, isError: isErrorDropoff, error: dropoffError } = useQuery({
    queryKey: ["singleDropoff", id],
    queryFn: () => fetchSingleDropoffRequest(parseInt(id)),
    refetchOnWindowFocus: false, // avoid refetching on window focus
    staleTime: 0, // data becomes stale immediately for refetching
  });


  useEffect(() => {
    if (dropoffData) {
      setShipmentId(dropoffData?.shipment?.id);
      // console.log("dropoff data:", dropoffData);
      setDropoffForm((prevForm) => ({
        ...prevForm,
        shipment_id: dropoffData?.shipment?.id,
        dropoff_id: dropoffData?.id
      }));
    }
  }, [dropoffData]);

  const { data: shipmentData, isLoading: isLoadingShipment, isError: isErrorShipment, error: shipmentsError } = useQuery({
    queryKey: ["singleShipments", id],
    queryFn: () => fetchSingleShipmentRequest(parseInt(shipmentId)),
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  const saveInvoices = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setLoading(true);
    console.log("object food", dropoffForm);
    try {
      const { data } = await createInvoiceDropoff(dropoffForm);

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
        toast({
          title: "Error",
          description: `${error?.response?.data?.message}`,
          variant: "destructive",
      });
      }
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (dropoffForm?.cost || dropoffForm?.additional_cost) {
      setDropoffForm((prevForm) => ({
        ...prevForm,
        total: (parseFloat(dropoffForm?.cost || 0) + parseFloat(dropoffForm?.additional_cost || 0)),
      }));
    }
  }, [dropoffForm?.cost, dropoffForm?.additional_cost]);

  // useEffect(() => {
  //   if (dropoffData) {
  //     setDropoffForm((prevForm) => ({
  //       ...prevForm,
  //       shipment_id: ,
  //     }));
  //   }
  // }, [dropoffData]);

  const formatValue = (value: string | number): string | number => {
    return value?.toLocaleString("en-US");
  };

  const areItemsComplete = useMemo(() => {
    const textComplete = dropoffForm.cost !== null && dropoffForm?.trackingId?.trim() !== "" && dropoffForm?.deliveryPlan?.trim() !== "" && dropoffForm?.deliveryCompany?.trim() !== "";
    return textComplete
  }, [dropoffForm]);


  if (isLoadingShipment && isLoadingDropoff && shipmentData) {
    return <SkeletonLoader number={5} />
  }



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

            <div className="flex  justify-between md:flex-row xs:flex-col px-[36px] py-[43px] w-full ">
              <div>
                <B1>
                  <div className="!text-[11px] text-gray-800 my-2">Tracking ID:</div>
                  {
                    dropoffData?.status?.code === '01' ?
                      <CustomInput
                        required
                        setValue={(value) =>
                          setDropoffForm((prev: any) => ({ ...prev, trackingId: value }))
                        }
                        value={dropoffForm?.trackingId} // Use the value from the array
                        type="text"
                        showLabel={false}
                        label={"Tracking ID"}
                        className="!h-[38px] !w-full !px-[0px] !text-[0.875rem] !font-[400]"
                      />
                      :
                      <div>{dropoffData?.trackingId}</div>
                  }
                </B1>

                <B1>
                  <div className="!text-[11px] text-gray-800 my-2">Cost:</div>
                  {
                    dropoffData?.status?.code === '01' ?
                      <CustomInput
                        required
                        setValue={(value) =>
                          setDropoffForm((prev: any) => ({ ...prev, cost: Number(value) }))
                        }
                        value={dropoffForm?.cost || ""} // Use the value from the array
                        type="number"
                        showLabel={false}
                        label={"Cost"}
                        className="!h-[38px] !w-full !px-[0px] !text-[0.875rem] !font-[400]"
                      />
                      :
                      <div className="text-md font-medium">₦{formatValue(dropoffData?.cost)}</div>
                  }
                </B1>

                <B1>
                  <div className="!text-[11px] text-gray-800 my-2">Delivery Company:</div>
                  {
                    dropoffData?.status?.code === '01' ?
                      <CustomInput
                        required
                        setValue={(value) =>
                          setDropoffForm((prev: any) => ({ ...prev, deliveryCompany: value }))
                        }
                        value={dropoffForm?.deliveryCompany} // Use the value from the array
                        type="text"
                        showLabel={false}
                        label={"Delivery Company"}
                        className="!h-[38px] !w-full !px-[0px] !text-[0.875rem] !font-[400]"
                      />
                      :
                      <div>{dropoffData?.deliveryCompany}</div>
                  }
                </B1>
              </div>

              <div>
                <B1>
                  <div className="!text-[11px] text-gray-800 my-2">Delivery Plan:</div>
                  {
                    dropoffData?.status?.code === '01' ?
                      <CustomSelect
                        wrapperClass='!border-[0.5px] !border-gray !h-[38px] md:w-full xs:w-full'
                        labelClass='!text-[0.875rem] text-gray-500 w-full'
                        optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                        optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                        label='Select Delivery Plan'
                        setSelected={(value) =>
                          setDropoffForm((prev: any) => ({ ...prev, deliveryPlan: value }))
                        }
                        selected={dropoffForm?.deliveryPlan}
                        options={[
                          {
                            label: 'Scheduled',
                            value: 'Scheduled'
                          },
                          {
                            label: 'Express',
                            value: 'EXpress'
                          }
                        ]}
                      />
                      :
                      <div>{dropoffData?.deliveryPlan}</div>
                  }
                </B1>

                <B1>
                  <div className="!text-[11px] text-gray-800 my-2">Additional Cost:</div>
                  {
                    dropoffData?.status?.code === '01' ?
                      <CustomInput
                        required
                        setValue={(value) =>
                          setDropoffForm((prev: any) => ({ ...prev, additional_cost: Number(value) }))
                        }
                        value={dropoffForm?.additional_cost || ""} // Use the value from the array
                        type="number"
                        showLabel={false}
                        label={"Additional Cost"}
                        className="!h-[38px] !w-full !px-[0px] !text-[0.875rem] !font-[400]"
                      />
                      :
                      <div>₦{formatValue(dropoffData?.additional_cost)}</div>
                  }
                </B1>
              </div>
            </div>

            <div className="flex items-center justify-between px-[36px] py-[43px]">


              <div className="flex justify-center items-center">
                <div>Total:</div>
                <div className="text-sky-700 ml-3 text-xl">
                  {
                    dropoffData?.status?.code === '01' ?
                    <div>
                      ₦{formatValue(parseFloat(dropoffForm?.cost || 0) + parseFloat(dropoffForm?.additional_cost || 0))}
                    </div>
                      :
                      <div>₦{formatValue(dropoffData?.total)}</div>
                  }
                  {/* ₦{formatValue(parseFloat(dropoffForm?.cost || 0) + parseFloat(dropoffForm?.additional_cost || 0))} */}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              {
                dropoffData?.status?.code === '01' &&
                <CustomButton
                  onClick={saveInvoices}
                  disabled={loading || !areItemsComplete}
                  type="submit" // Explicitly set as "submit"
                  className={`${!areItemsComplete ? "bg-primary opacity-40" : "bg-primary"} !py-[0px] !w-[139px] !h-[48px] !text-[0.875rem] bg-primary text-white text-center`}
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
              {/* {userString} */}
              {
                (dropoffData?.status?.code === '05' && userString?.includes("admin") || userString?.includes("manager")) &&
                <CustomButton
                  className="!py-[0px] !w-[139px] !h-[48px] !text-[0.875rem] bg-white !text-primary border-[1px] border-primary"
                // onClick={saveInvoices}
                // disabled={loading}
                >
                  Message To Client
                </CustomButton>
              }
              {
                (dropoffData?.status?.code !== '01' && dropoffData?.status?.code !== '05') &&
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
