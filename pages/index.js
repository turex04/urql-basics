import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useQuery } from "urql";
import { client, ssrCache } from "../src/urqlClient";

const WeatherQuery = `
query AbujaWeather($city:String!){
  getCityByName(name:$city){
    id
    name
    weather {
      summary {
        title
        description
      }
      temperature {
        min
        max
        actual
      }
    }
  }
}
`;

export default function Home() {
    const [result] = useQuery({
        query: WeatherQuery,
        variables: { city: "Abuja" },
    });
    const { data, loading, error } = result;

    if (loading) return "Loading";
    if (error) return "Error";

    return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
}

export async function getServerSideProps() {
    await client.query(WeatherQuery, { city: "Abuja" }).toPromise();
    return { props: { urqlState: ssrCache.extractData() } };
}

// export async function getStaticProps() {
//     await client.query(WeatherQuery, { city: "Abuja" }).toPromise();
//     return { props: { urqlState: ssrCache.extractData() }, revalidate: 60 };
// }
