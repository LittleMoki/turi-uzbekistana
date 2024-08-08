import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react'
import {useMutation} from "@tanstack/react-query";
import {api} from "@/Api/api.js";
import {useState} from "react";
import {Lock, Mail} from "@mui/icons-material";
import Cookies from 'js-cookie';
import {useRouter} from "next/navigation";

export const SignIn = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: (formData) => {
            return api.post('/auth/login', formData)
        },
        onSuccess: (data) => {
            if (data.data.token) {
                Cookies.set('userId', data.data.data.id, {expires: 1})// token saving for 1 day
                Cookies.set('session', data.data.token, {expires: 1})// token saving for 1 day
                router.push('/user')
                router.refresh()
            }
        },
        onError: (err) => {
            const newErrors = {};
            if (err.response?.data) {
                if (err.response.data.email) {
                    newErrors.email = err.response.data.email;
                }
                if (err.response.data.password) {
                    newErrors.password = err.response.data.password;
                }
            } else {
                newErrors.general = 'An error occurred. Please try again.';
            }
            setErrors(newErrors);
        }
    })

    const onSubmit = (event) => {
        event.preventDefault()
        mutation.mutate({
            email: formData.email,
            password: formData.password
        })
    }

    const handleInputChange = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <Button onPress={onOpen} color='c'>
                Авторизация
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className='flex items-center flex-col gap-1'>
                                Войти
                            </ModalHeader>
                            <ModalBody>
                                <form className='flex flex-col gap-3' onSubmit={onSubmit}>
                                    <Input
                                        autoFocus
                                        endContent={
                                            <Mail className='text-2xl text-default-400 pointer-events-none flex-shrink-0'/>
                                        }
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        label='Email'
                                        placeholder='Enter your email'
                                        name='email'
                                        isInvalid={!!errors.email}
                                        errorMessage={errors.email}
                                        variant='bordered'
                                    />
                                    <Input
                                        endContent={
                                            <Lock className='text-2xl text-default-400 pointer-events-none flex-shrink-0'/>
                                        }
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        label='Password'
                                        placeholder='Enter your password'
                                        type='password'
                                        name='password'
                                        isInvalid={!!errors.password}
                                        errorMessage={errors.password}
                                        variant='bordered'
                                    />
                                    <Button
                                        className='text-white'
                                        color='success'
                                        type='submit'
                                    >
                                        Sign in
                                    </Button>
                                    {errors.general && (
                                        <div className="text-red-500 mt-2">{errors.general}</div>
                                    )}
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
