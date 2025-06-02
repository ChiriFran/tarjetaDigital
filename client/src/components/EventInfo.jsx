import iconCivil from '../../media/icons/civil.webp'
import iconNovios from '../../media/icons/novios.webp'
import iconFiesta from '../../media/icons/fiesta.webp'
import iconFecha from '../../media/icons/calendario.webp'
import iconDresscode from '../../media/icons/mono.webp'

import "../styles/EventInfo.css";

function EventInfo() {
    // Info arriba de la tarjeta
    const infoTop = [
        {
            icon: <img src={iconFecha} alt="icono" className="iconImg iconTopBottom" />,
            title: "¿Cuando nos casamos?",
            subtitle: "10-9-25",
        },
    ];

    // Info dentro de la tarjeta (Itinerario)
    const eventDetails = [
        {
            icon: <img src={iconCivil} alt="icono" className="iconImg" />,
            title: "Civil",
            subtitle: "11:00 hs",
        },
        {
            icon: <img src={iconNovios} alt="icono" className="iconImg" />,
            title: "Ceremonia",
            subtitle: "18:00 hs",
        },
        {
            icon: <img src={iconFiesta} alt="icono" className="iconImg" />,
            title: "Fiesta",
            subtitle: "21:30 hs",
        }
    ];

    // Info abajo de la tarjeta con paleta de colores recomendados
    const infoBottom = [
        {
            icon: <img src={iconDresscode} alt="icono" className="iconImg iconTopBottom" />,
            title: "Dress Code",
            subtitle: "ELEGANTE SPORT",
            colors: ['#E3D0BA', '#8A9BA8', '#D9A3B1'], // paleta sugerida
        },
    ];

    const renderInfoList = (list) => (
        <div className="event-info-list">
            {list.map((item, index) => (
                <div key={index} className="event-info-item">
                    <div className="event-card__icon">{item.icon}</div>
                    <div className="event-card__text">
                        <div className="event-card__detail-title-top-botom">{item.title}</div>
                        <div className="event-card__detail-subtitle-top-botom">{item.subtitle}</div>

                        {item.colors && (
                            <div className="dresscode-colors">
                                {item.colors.map((color, i) => (
                                    <div
                                        key={i}
                                        className="dresscode-color"
                                        style={{
                                            backgroundColor: color,
                                            zIndex: 3 - i,
                                            marginLeft: i === 0 ? 0 : -12,
                                        }}
                                    ></div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            {/* Info arriba */}
            {renderInfoList(infoTop)}

            {/* Tarjeta itinerario */}
            <div className="event-card">
                <h2 className="event-card__title">Itinerario</h2>
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

            {/* Info abajo */}
            {renderInfoList(infoBottom)}
        </div>
    );
}

export default EventInfo;
