/*

    Color legend, recives its ticks and title and adds it inside an existing svg element

*/

export const ColorLegend = ({innerWidth, legendWidth, ticks, title}) => {

    return (
        <g transform={`translate(${innerWidth - legendWidth}, 0)`}>
            <rect
                x="0"
                y="10"
                width={legendWidth - 10}
                height={30 + ticks.length * 30}
                fill="#fafafa"
            />
            <g transform={`translate(20, 25)`}>
                <text alignmentBaseline="middle" style={{"fontWeight": "bold"}}>{title}</text>
            </g>
            {
                ticks.map((tick, i) => {
                    return (
                        <g transform={`translate(20, ${25 + 30 * (i + 1)})`}>
                            <circle r={10} fill={tick.color} />
                            <text dx="20" alignmentBaseline="middle">{tick.text}</text>
                        </g>
                    )
                })
            }
        </g>
    );
}