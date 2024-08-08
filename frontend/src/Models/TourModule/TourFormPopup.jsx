import { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    InputLabel,
    TextareaAutosize,
    Button,
} from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";

export const TourFormPopup = ({ application, fn }) => {
    return (
        <div
            className={`fixed w-full h-[100vh] z-[30] top-0 left-0 bg-black/50 flex justify-center items-center duration-100 ${
                application ? "scale-1" : "scale-0"
            }`}
        >
            <div className="bg-white max-w-[400px] w-full p-5">
                <div className="flex justify-end">
                    <IoCloseOutline
                        onClick={fn}
                        className="w-8 h-8 cursor-pointer"
                    />
                </div>
                <h1 className="text-center text-2xl font-medium">
                    Введите данные, и мы свяжемся с Вами
                </h1>
                <div className="flex flex-col gap-5">
                    <FormControl>
                        <InputLabel>Имя</InputLabel>
                        <Input placeholder="Как к вам обращаться?" />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Телефон:</InputLabel>
                        <Input placeholder="+7 (999) 999-99-99" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Пожелания по туру:</FormLabel>
                        <TextareaAutosize
                            placeholder="Я хочу посетить..."
                            minRows={4}
                            maxRows={4}
                        />
                    </FormControl>
                </div>
                <p className="text-center text-xs pt-3">
                    Нажимая на кнопку Вы даете согласие на обработку
                    персональных данных и соглашаетесь с{" "}
                    <strong> Политикой конфиденциальности</strong>
                </p>
                <Button
                    className="w-full"
                    style={{
                        color: "white",
                        backgroundColor: "green",
                        marginTop: "20px",
                    }}
                    onClick={fn}
                >
                    Оставить заявку
                </Button>
            </div>
        </div>
    );
};
