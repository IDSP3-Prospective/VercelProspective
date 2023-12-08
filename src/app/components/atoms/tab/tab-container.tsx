import { ReactNode } from "react";

export default function TabContainer(props: {children:ReactNode}) {
    return (
        <div className="bg-gray-100 rounded-xl pb-10">
            {props.children}
        </div>
    )
}