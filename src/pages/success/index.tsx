import { useGetUser } from "@/components/home/api/useGetUser";
import Container from "@/entities/container/container";
import SpinnerLoader from "@/shared/UI/SpinnerLoader/SpinnerLoader";
import { routeEndpoints } from "@/shared/routeEndpoint";
import { type NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const writeToUs = () => {
  // WHATSAPP LINK
  window.open(
    "https://api.whatsapp.com/send?phone=+77074188450&text=Здравствуйте, меня интересует ваш объект",
    "_blank"
  );
};

const Home: NextPage = () => {
  const { isLoading, user } = useGetUser();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined && isLoading === false) {
      router.push(routeEndpoints.login);
    }
  }, [user, isLoading]);

  return (
    <Container>
      {isLoading ? (
        <SpinnerLoader />
      ) : user !== undefined ? (
        <div className="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="mx-auto my-6 h-16 w-16 text-green-600"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">
              Регистрация прошла успешна
            </h3>
            <p className="my-2 text-gray-600">
              Спасибо, ваши данные успешно отправлены. <br /> Ожидайте
              дальнейших обновлений, разработка админной панели для вашего
              объекта в разработке.
            </p>
            <p>Удачного вам дня!</p>
            <div className="py-10 text-center">
              <button
                onClick={writeToUs}
                className="bg-indigo-600 px-12 py-3 font-semibold text-white hover:bg-indigo-500"
              >
                Написать нам
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen flex-col items-center justify-center bg-white">
          <svg
            height="32"
            style={{ width: "48px", height: "48px", marginBottom: "16px" }}
            viewBox="0 0 32 32"
            width="32"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <g id="Error_1_">
                <g id="Error">
                  <circle
                    cx="16"
                    cy="16"
                    id="BG"
                    r="16"
                    style={{ fill: "#D72828" }}
                  />
                  <path
                    d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z"
                    id="Exclamatory_x5F_Sign"
                    style={{ fill: "#E6E6E6" }}
                  />
                </g>
              </g>
            </g>
          </svg>
          <p>Что то пошло не так</p>
          <div className="py-10 text-center">
            <button
              onClick={writeToUs}
              className="bg-indigo-600 px-12 py-3 font-semibold text-white hover:bg-indigo-500"
            >
              Написать нам
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Home;
