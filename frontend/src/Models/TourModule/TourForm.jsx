import { Container } from "@/Components";
import { Button, FormControl, FormLabel, Input } from "@mui/material";
export const TourForm = () => {
    return (
        <section className="pt-10">
            <Container>
                <h2 className="lg:text-2xl text-xl max-w-[600px] text-[#555] border-[#198754] border-b-2 pb-3">
                    Заполните форму обратной связи и получите полную PDF -
                    презентацию тура
                </h2>
                <div className="pt-8 grid grid-cols-1 lg:grid-cols-4 items-end gap-8">
                    <FormControl>
                        <FormLabel className="">Имя:</FormLabel>
                        <Input placeholder="Как к вам обращаться" />
                    </FormControl>
                    <FormControl className="">
                        <FormLabel>Телефон:</FormLabel>
                        <Input
                            placeholder="+7 (999) 999-99-99"
                            style={{ borderBottom: "red", padding: "0 5px" }}
                        />
                    </FormControl>
                    <label className="flex flex-col gap-2 border-b-2">
                        Желаемые даты:
                        <input
                            type="date"
                            className="bg-transparent border-0"
                        />
                    </label>
                    <Button
                        type="submit"
                        style={{
                            backgroundColor: "#198754",
                            color: "white",
                            padding: "6px 12px",
                            height: "38px",
                        }}
                    >
                        Узнать подробности по туру
                    </Button>
                </div>
            </Container>
        </section>
    );
};
