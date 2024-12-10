
import '../Styles/QuesCard.css';
const QuesCard = (props) => {
    const { q, handleAnswerChange } = props;
    return (
        <div className="quesCard">
            <p className="quesText">{q[1]}</p> {/* Question Text */}
            <div className='options-wrapper'>
                {['A', 'B', 'C'].map((opt, idx) => (
                    <label className="option" key={opt}>
                    <input
                        type="radio"
                        name={q[0]}
                        value={opt}
                        onChange={() => handleAnswerChange(q[0], opt)}
                    />
                    {q[idx + 2]} {/* Option Text */}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default QuesCard;