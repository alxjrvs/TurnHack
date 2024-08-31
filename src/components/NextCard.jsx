export default function NextCard({ stratCards, turnIndex, assignmentCache, passedCache }) {
  if (!assignmentCache[turnIndex]) {
    return null
  }

  const crawlForNext = (index) => {
    const nextTurnIndex = index < 7 ? index + 1 : 0;
    const hasPassed = !!passedCache[nextTurnIndex]

    if(hasPassed) {
      return crawlForNext(nextTurnIndex)
    }
    return nextTurnIndex
  }

  const nextTurnIndex = crawlForNext(turnIndex)
  const name = assignmentCache[nextTurnIndex]
  const hasPassed = !!passedCache[nextTurnIndex]
  const borderColor = hasPassed ? 'border-slate-800' : stratCards[nextTurnIndex].border

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
