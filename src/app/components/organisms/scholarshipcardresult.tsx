"use client"

import TitleBlock from "../molecules/titleblock";
import ContainerCard from "../atoms/container/container-card";
import ValuesBlock from "../molecules/valuesblock";
import ButtonActionText from "../atoms/button/button-action-text";
import ScholarshipIconFrame from "../molecules/scholarshipiconframe";

import { useState } from "react";

import { saveScholarshipToUser } from "@/app/(pages)/scholarship/action";

export default function ScholarshipCardResult(props: { title: string, content: string, award: number | string, deadline: string, href: string, src: string, alt: string }) {

  let value: string = "";

  if (typeof props.award === "number" ||
    (typeof props.award === "string" && !isNaN(Number(props.award)))) {
    // If it's a number or a string that can be converted to a number, add a dollar sign
    value = "$" + props.award;
  } else {
    // If it's a non-numeric string, display as is
    value = props.award;
  }

  const string = props.href;

  const [index, setIndex] = useState(0);
  const [buttonToggle, setButtonToggle] = useState(false);

  const messageArray = ["Save to Profile", "Saving to Profile", "Saved to Profile"]

  const jsonData = JSON.stringify(props)

  const handleClick = async () => {

    setIndex(1);
    await saveScholarshipToUser(jsonData);
    setButtonToggle(true);
    setIndex(2);

  };

  return (
      <ContainerCard>
        {/* Scholarship block container */}
        <div className="flex pl-2">
          <div className="w-3/4">
            {/* Scholarship title */}
            <TitleBlock header={props.title} />
            <div className="flex h-16 overflow-hidden text-xs text-dark-gray">
              {props.content}
            </div>
          </div>
  
          <div className="w-1/5 ml-2">
            <ScholarshipIconFrame src={props.src} alt={props.alt} />
          </div>
        </div>
  
        <div className="flex-grow"></div> {/* This will push the next elements to the bottom */}
  
        {/* Bottom content */}
        <div>
          <div className="flex justify-between items-center p-2">
            <ValuesBlock header="Award" value={value} />
            <ValuesBlock header="Deadline" value={props.deadline} />
            <ButtonActionText href={string} text="Details" />
          </div>
          <div className="flex justify-center">
            <button className="text-center p-2 bg-azure-blue text-white text-xs font-medium py-2 px-6 rounded-full transition-transform ease-in-out duration-300 transform hover:scale-105" onClick={handleClick} disabled={buttonToggle} aria-disabled={buttonToggle}>
              {messageArray[index]}
            </button>
          </div>
        </div>
      </ContainerCard>
  )
}