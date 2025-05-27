import {useMemo} from "react";
import * as yup from 'yup';

export const useValidation = () => {
    return useMemo(() => {
        return yup.object({
            name: yup.string().required('Это поле обязательное'),
            user_id: yup.string().required('Это поле обязательное'),
        });
    }, []);
};