import { useState, useEffect, useRef} from "react";

export default function NextCard({ num, borderColor, name, setName }) {
  if (!name) {
    return
  }

  return (
    <div className={["my-3 flex justify-evenly flex-col  items-center border border-8 rounded-3xl", `${borderColor}`].join(" ")}>
      <div style={{
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      }}>
        <p style={{flexGrow:1, minWidth: 200, textTransform: 'uppercase', fontSize: 12}}>UP NEXT</p>
        <p style={{flexGrow:1, minWidth: 200, textTransform: 'uppercase', fontSize: 25}}>{name}</p>
      </div>
    </div>
  );

}
