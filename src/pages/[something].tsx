import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import path from "path";
import fs from "fs/promises";
import PhoneNumberInput from "../../components/places/PhoneNumberInput";

interface starInterface {
  eventName: string;
  eventDate: string;
  eventTime: string;
}
async function getData() {
  const filePath = path.join(
    process.cwd(),
    "src",
    "backendData",
    "some-backend-data.json"
  );
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return data;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const itemID = context.params?.something;
  const data = await getData();
  const foundItem = data.stars.find(
    (item: starInterface) => itemID === item.eventName
  );

  if (!foundItem) {
    return {
      props: { hasError: true },
    };
  }

  return {
    props: {
      specificStarData: foundItem,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();
  const pathsWithParams = data.stars.map((star: starInterface) => ({
    params: { something: star.eventName },
  }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
};

const ProjectPage = (props: {
  specificStarData: starInterface;
  hasError: boolean;
}) => {
  const router = useRouter();

  if (props.hasError) {
    return <h1>Error - please try another parameter</h1>;
  }

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    /*THIS IS WHERE YOU CREATE LAYOUT FOR PAGES CREATED ON EVENT PUSH*/
    /* DATA COMING FROM BACKENDDATA FOLDER */
    /* FORM COMPONENT COMING FROM PHONENUMBERINPUT.JSX IN COMPONENTS FOLDER */
    /* YOU HAVE CREATIVE FREEDOM TO MAKE THIS LOOK BETTER */

    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="flex flex-row justify-center text-lg text-gray-700">
        Attending {props.specificStarData.eventName}?
      </h2>
      <p className="flex flex-row justify-center text-sm text-gray-600">
        {props.specificStarData.eventDate} at {props.specificStarData.eventTime}
      </p>
      <div className="flex flex-row justify-center">
      <PhoneNumberInput></PhoneNumberInput>
      </div>
      
    </section>
  );
};

export default ProjectPage;
