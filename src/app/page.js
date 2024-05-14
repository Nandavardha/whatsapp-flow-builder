"use client"

import styles from "./page.module.css";

import { WhatsAppFlow as Default } from "../../page-components/WhatsAppBuilder";

export default function Home({params}) {
  return (
    
      <Default params={params}/>

  );
}
