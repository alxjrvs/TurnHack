import { useState, useEffect, useRef} from "react";

const CHOICES = ["Jerry", "John", "Stu", "Jarvis"]

export default function Card({ num, borderColor, name, setName }) {
  return (
    <div className={["my-3 flex justify-evenly flex-col grow items-center border border-8 rounded-3xl", `${borderColor}`].join(" ")}>
      <p className="text-9xl">{num}</p>
      <div style={{
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginLeft: 20, marginRight: 20,
      }}>
        {name ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            pointer: 'cursor',
            justifyContent: 'space-between',
            gap: 10,
          }}>
            <p style={{flexGrow:1, minWidth: 200, textTransform: 'uppercase', fontSize: 25}}>{name}</p>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
              {CHOICES.map((choice) => (
                <div key={choice} onClick={() => setName(choice)} style={{ cursor: 'pointer', fontSize: 25, textTransform: 'uppercase' }}>{choice}</div>
              ))}
          </div>
        )}
      </div>
      {name && <div style={{ cursor: 'pointer' }} onClick={() => setName()}><p>clear player choice</p></div>}
    </div>
  );

}
