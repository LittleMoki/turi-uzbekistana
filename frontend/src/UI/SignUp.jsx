'use client'
import {
    Button, Input, Modal, ModalBody, ModalContent, useDisclosure,
} from '@nextui-org/react'
import Image from "next/image";
import bg from '/public/registration-banner.jpg'
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {api} from "@/Api/api.js";
import Cookies from "js-cookie";
import {object, ref, string} from "yup";

const SignUp = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        photo: '',
        password: '',
        email: '',
        confirmPassword:''
    });
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (formData) => {
            console.log("Sending data:", formData); // Добавьте лог здесь
            return api.post('/auth/register', formData)
        },
        onSuccess: (data) => {
            console.log("Received data:", data); // Добавьте лог здесь
            if (data.data.token) {
                Cookies.set('userId', data.data.data.id, {expires: 1}); // token saving for 1 day
                Cookies.set('session', data.data.token, {expires: 1}); // token saving for 1 day
                router.push('/user');
                router.refresh();
            }
        },
        onError: (error) => {
            console.error("Error:", error); // Добавьте лог здесь
        },
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("Form data before validation:", formData); // Добавьте лог здесь
            await userSchema.validate(formData, {abortEarly: false});
            mutation.mutate({
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone_number: formData.phone_number,
                photo: formData.photo,
                password: formData.password,
                email: formData.email,
            });
        } catch (err) {
            const newErrors = {};
            err.inner.forEach((error) => {
                newErrors[error.path] = error.message;
            });
            setErrors(newErrors);
            console.error("Validation errors:", newErrors); // Добавьте лог здесь
        }
    };

    const userSchema = object({
        password: string()
            .min(8, "Password must be at least 8 characters")
            .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one symbol"
            )
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
        confirmPassword: string()
            .oneOf([ref("password")], "Passwords must match"),
        email: string()
            .min(1, 'Email is Required')
            .email("Invalid email format"),
        phone_number: string()
            .matches(/^\d{10}$/, "Phone Number must be 10 digits")
            .required(),
        first_name: string().min(1, 'Please enter first name'),
    });

    const handleInputChange = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <Button onPress={onOpen} color='c'>
                Регистрация
            </Button>
            <Modal
                className='max-w-[800px]'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement='top-center'
            >
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalBody className='p-0'>
                                <div className='flex sm:flex-row flex-col gap-3 sm:pl-3.5'>
                                    <div>
                                        <div className='flex flex-col gap-2 text-center py-5'>
                                            <h2 className='text-[1.5rem]'>Начни путешествовать по-новому</h2>
                                            <small className='text-[.875em]'>
                                                Зарегистрируйтесь сейчас и получите доступ к эксклюзивным предложениям, уникальным маршрутам и специальным скидкам на туры по Центральной Азии. Не упустите возможность первыми узнать о новых направлениях и лучших ценах!
                                            </small>
                                        </div>
                                        <form onSubmit={onSubmit} className='flex flex-col gap-3 pb-3'>
                                            <Input
                                                value={formData.first_name}
                                                onChange={(e) => handleInputChange('first_name', e.target.value)}
                                                label='Имя'
                                                placeholder='Ваше имя'
                                                variant='bordered'
                                                isInvalid={!!errors.first_name}
                                                errorMessage={errors.first_name}
                                            />
                                            <Input
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                label='Email'
                                                placeholder='Ваш Email'
                                                variant='bordered'
                                                isInvalid={!!errors.email}
                                                errorMessage={errors.email}
                                            />
                                            <Input
                                                value={formData.phone_number}
                                                onChange={(e) => handleInputChange('phone_number', e.target.value)}
                                                label='Телефон'
                                                placeholder='Ваш телефон'
                                                variant='bordered'
                                                isInvalid={!!errors.phone_number}
                                                errorMessage={errors.phone_number}
                                            />
                                            <Input
                                                value={formData.password}
                                                onChange={(e) => handleInputChange('password', e.target.value)}
                                                label='Пароль'
                                                placeholder='Ваш пароль'
                                                type='password'
                                                variant='bordered'
                                                isInvalid={!!errors.password}
                                                errorMessage={errors.password}
                                            />
                                            <Input
                                                value={formData.confirmPassword}
                                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                                label='Подтвердите пароль'
                                                placeholder='Подтвердите пароль'
                                                type='password'
                                                variant='bordered'
                                                isInvalid={!!errors.confirmPassword}
                                                errorMessage={errors.confirmPassword}
                                            />
                                            <Button
                                                className='text-white'
                                                color='success'
                                                type='submit'
                                            >
                                                Согласиться и продолжить
                                            </Button>
                                        </form>
                                    </div>
                                    <Image className='sm:max-w-[300px] sm:w-full sm:h-auto h-[330px] object-cover' src={bg} alt={bg}/>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default SignUp
