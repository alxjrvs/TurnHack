export default function NextCard({stratCards, turnIndex, assignmentCache }) {
  const nextTurnIndex = turnIndex < 7 ? turnIndex + 1 : 0;
  console.log('Next Turn Index', nextTurnIndex)
  console.log('stratCards', stratCards)
  const name = assignmentCache[nextTurnIndex]
  const borderColor = stratCards[nextTurnIndex].border

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
