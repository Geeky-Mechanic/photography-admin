<script context="module">
    export async function load({ fetch }) {
        const res = await fetch(`/api/availability`,{
            headers: {
                "Content-Type": "application/json",
            }
        });

        const bookingRes = await fetch(`/api/booking`);
        
        const bookingData = await bookingRes.json();
        const data = await res.json()

        return {
            props: {
                bookingData,
                data,
            },
        };
    }
</script>

<script>
    import { goto } from "$app/navigation";
    import FullCalendar from "svelte-fullcalendar/src/FullCalendar.svelte";
    import daygridPlugin from "@fullcalendar/daygrid";
    import interactionPlugin from "@fullcalendar/interaction";
    import timegridPlugin from "@fullcalendar/timegrid";

    export let data;
    export let bookingData;

    const calendarDates = [];

    data.forEach((item) => {
        const dayDate = new Date(item.day);
        item.hours.forEach((hour) => {
            calendarDates.push({title: "Disponible" ,start : dayDate.setHours(parseInt(hour), 0,0,0), end: dayDate.setHours(parseInt(hour) + 3, 0,0,0)});
        });
    });

    bookingData.forEach((item) => {
        calendarDates.push({
            title: item.name,
            start: new Date(item.date),
            end: new Date(item.date).setHours(new Date(item.date).getHours() + 3),
            backgroundColor: "#f0930b",
            url: `/reservations/rendez-vous/${item._id}`,
            textColor: "#fff",
        });
    })

    //dateStr
    const options = {
        dateClick: (event) => /*console.log(event.date),*/goto(`/reservations/${event.dateStr}`),
        initialView: "dayGridMonth",
        plugins: [timegridPlugin, daygridPlugin, interactionPlugin],
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
            height: "70%",
        },
        buttonText: {
            today: "Aujourd'hui",
            month: "Mois",
            week: "Semaine",
            day: "Jour",
            list: "Liste",
        },
        locale: "fr",
        events: calendarDates,
    };
</script>

<main>
    <h1>Calendrier des disponibilités et rendez-vous</h1>
    <h3>Clickez sur une date pour choisir les heures de disponibilité pour cette date, ou clickez sur un rendez pour voir plus d'informations</h3>
    <FullCalendar {options} />
</main>

<style>
    main {
        flex: 6;
        z-index: 1;
    }
</style>
