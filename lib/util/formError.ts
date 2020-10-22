import { InternalNamePath } from "antd/lib/form/interface";
import { Dispatch, SetStateAction } from "react";
import { ValidateStatus } from "../../pages/user/login";

type ErrorType = {
  name: "email" | "password",
  errors: InternalNamePath
}

const formError = (errorsMap: ErrorType[], setValidateEmail?: Dispatch<SetStateAction<ValidateStatus>>, setValidatePassword?: Dispatch<SetStateAction<ValidateStatus>>) => {
  errorsMap.map(error => {
    error.name[0] === "email" && setValidateEmail({validateStatus: "error", message: (error.errors[0] as any)})
    error.name[0] === "password" && setValidatePassword({validateStatus: "error", message: (error.errors[0] as any)})
  })
}

export default formError