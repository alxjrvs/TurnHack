export default function NextCard({ crawlForNextUnpassed, num, stratCards, state: { assignmentCache, passedCache }}) {
  if (!assignmentCache[num]) {
    return null
  }

  const nextCurrentNum = crawlForNextUnpassed(num)
  const name = assignmentCache[nextCurrentNum]
  const hasPassed = !!passedCache[nextCurrentNum]
  const borderColor = hasPassed ? 'border-slate-800' : stratCards[nextCurrentNum].border

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
        <p style={{ flexGrow: 1, minWidth: 200, textTransform: 'uppercase', fontSize: 25 }}>{name} ({nextCurrentNum})</p>
      </div>
    </div>
  );

}
