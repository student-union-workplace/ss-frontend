import {useMemo} from "react";
import * as yup from 'yup';

export const useValidation = () => {
    return useMemo(() => {
        return yup.object({
            email: yup.string().email('Неверно введенная почта').required('Это поле обязательное'),
            password: yup
                .string()
                .required('Это поле обязательное'),
        });
    }, []);
};