const PLAYERS = ["Jerry", "John", "Stu", "Jarvis"]

export default function Card({ stratCards, turnIndex, assignmentCache, setName, setPassedCache, passedCache }) {
  const name = assignmentCache[turnIndex]
  const hasPassed = !!passedCache[turnIndex]
  const borderColor = hasPassed ? 'border-slate-800' : stratCards[turnIndex].border
  const num = stratCards[turnIndex].num
  const invalidPlayers = Object.values(assignmentCache).filter((e, i, a) => a.indexOf(e) !== i) // [2, 4]

  const onTogglePass = () => setPassedCache(cache => ({ ...cache, [turnIndex]: !hasPassed }))

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
              {PLAYERS.map((player) => (
                <div
                  key={player}
                  onClick={() => !invalidPlayers.includes(player) && setName(player)}
                  style={{
                    cursor: invalidPlayers.includes(player) ? 'not-allowed' : 'pointer',
                    fontSize: 25, textTransform: 'uppercase',
                    background: '#303030',
                    padding: 5,
                    textDecoration: invalidPlayers.includes(player) ? 'line-through' : 'none',
                  }
                  }>
                  {player}
                </div>
              ))}
          </div>
        )}
      </div>
      {name && <div style={{ cursor: 'pointer' }} onClick={() => setName()}><p>clear player choice</p></div>}
      {name && <div style={{ cursor: 'pointer' }} onClick={onTogglePass}>
        <p>{hasPassed ? 'Un-Pass' : 'Pass'}</p>
      </div>}
    </div>
  );

}
