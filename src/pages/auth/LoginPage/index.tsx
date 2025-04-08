import {Box, Paper, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {Login} from "../../../types/login";
import {LOGIN_INITIAL_VALUES} from "./constants.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {useValidation} from "./use-validation.ts";
import {TextInput} from "../../../components/controls/TextInput.tsx";
import {PasswordInput} from "../../../components/controls/PasswordInput.tsx";
import Button from "@mui/material/Button";
import {useState} from "react";
import {ErrorSnackbar} from "../../../components/snackbars/ErrorSnackbar.tsx";
import axios from "axios";
import {BASE_URL} from "../../../api";

export const LoginPage = () => {
    const validation = useValidation();
    const {handleSubmit, control} = useForm<Login>({
        defaultValues: LOGIN_INITIAL_VALUES,
        resolver: yupResolver(validation)
    });
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)

    const loginHandler = async (values: Login) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, {
                email: values.email,
                password: values.password
            })
            console.log(response)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.access_token)
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
            setOpenErrorSnackbar(true)
        }
    }

    return (<Box sx={{backgroundColor: '#F6F6F6', minHeight: '100vh', placeItems: 'center'}}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '10%',
        }}>
            <Typography>ПБитрикс</Typography>
            <form onSubmit={handleSubmit(loginHandler)}>
                <Paper sx={{
                    width: "25rem",
                    display: 'flex',
                    flexDirection: 'column',
                    paddingInline: "49px",
                    paddingBlock: "66px",
                    gap: "34px",
                }}>

                    <TextInput name={'email'} control={control} label={'Почта*'}/>
                    <PasswordInput name={'password'} control={control} label={'Пароль*'} withShowPassword={true}/>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>ВОЙТИ</Button>

                </Paper>
            </form>
        </Box>
        <ErrorSnackbar open={openErrorSnackbar} setOpen={setOpenErrorSnackbar} message={'Данные введены неврно'} />
    </Box>)
}