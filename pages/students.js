import Head from "next/head";
import Image from "next/image";
import Homepage from "../components/homepage";
import Students_page from "../components/students_page";
import MainLayout from "../layouts/MainLayout";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<MainLayout>
			<Students_page />
		</MainLayout>
	);
}
