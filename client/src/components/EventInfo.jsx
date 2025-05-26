import iconCivil from '../../media/icons/civil.webp'
import iconNovios from '../../media/icons/novios.webp'
import iconFiesta from '../../media/icons/fiesta.webp'


import "../styles/EventInfo.css";

function EventInfo() {
    const eventDetails = [
        {
            icon: <img src={iconCivil} alt="icono" className="iconImg" />, // ✅
            title: "Civil",
            subtitle: "11:00 hs",
        },
        {
            icon: <img src={iconNovios} alt="icono" className="iconImg" />, // ✅
            title: "Ceremonia",
            subtitle: "18:00 hs",
        },
        {
            icon: <img src={iconFiesta} alt="icono" className="iconImg" />, // ✅
            title: "Fiesta",
            subtitle: "21:30 hs",
        }
    ];

    return (
        <div className="event-card">
            <h2 className="event-card__title">Itenerario</h2>
            <div className="event-card__details">
                {eventDetails.map((item, index) => (
                    <div key={index} className="event-card__detail">
                        <div className="event-card__icon">{item.icon}</div>
                        <div className="event-card__text">
                            <div className="event-card__detail-title">{item.title}</div>
                            <div className="event-card__detail-subtitle">{item.subtitle}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventInfo;
