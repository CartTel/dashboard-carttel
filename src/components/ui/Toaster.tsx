"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/Toast";
import { useToast } from "@/hooks/use-toast";

import { B1, B2, H2, H1, BMiddle } from "@/components/custom-typography";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="!p-4 bg-white">
            <div className="flex justify-center items-center gap-1">
              <div className="pr-2">
                {title === "Success" ? (
                  <div
                    id="toast-success"
                    className="flex items-center"
                    role="alert"
                  >
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                    </div>
                  </div>
                ) : title === "Error" ? (
                  <div
                    id="toast-danger"
                    className="flex items-center"
                    role="alert"
                  >
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                      </svg>
                    </div>
                  </div>
                ) : title === "Warning" ? (
                  <div
                    id="toast-warning"
                    className="flex items-center"
                    role="alert"
                  >
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div>
                {title === "Success" ? (
                  <div>
                    <div className="ms-3 text-sm font-normal text-green-500">
                      {title && <ToastTitle>{title}</ToastTitle>}
                    </div>
                    <BMiddle className="ms-3 text-xs font-normal">
                      {description && (
                        <ToastDescription>{description}</ToastDescription>
                      )}
                    </BMiddle>
                  </div>
                ) : title === "Error" ? (
                  <div>
                    <div className="ms-3 text-sm font-normal text-red-500">
                      {title && <ToastTitle>{title}</ToastTitle>}
                    </div>
                    <BMiddle className="ms-3 text-xs font-normal">
                      {description && (
                        <ToastDescription>{description}</ToastDescription>
                      )}
                    </BMiddle>
                  </div>
                ) : title === "Warning" ? (
                  <div>
                    <div className="ms-3 text-sm font-normal text-orange-500">
                      {title && <ToastTitle>{title}</ToastTitle>}
                    </div>
                    <BMiddle className="ms-3 text-xs font-normal">
                      {description && (
                        <ToastDescription>{description}</ToastDescription>
                      )}
                    </BMiddle>
                    {/* <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                          </button> */}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
