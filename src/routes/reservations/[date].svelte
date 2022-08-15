<script context="module">
    export async function load({ params, fetch }) {
        const date = params.date;

        const res = await fetch(`/api/availability/${date}`);

        const data = await res.json();

        return {
            props: {
                date,
                data,
            },
        };
    }
</script>

<script>
    export let date;
    export let data;

    /* ---->  enable removing hours  <---------------------------------- */
    let alreadyAvailableHours = data[0]?.hours;
    alreadyAvailableHours?.sort((a, b) => parseInt(a) - parseInt(b));

    // query formatting vars

    let hourString;
    let hours;
    let hoursToDelete = [];

    // conditionnal display vars

    let saved = false;
    let failed = false;

    const handleClick = async () => {
        failed = false;
        saved = false;
        hours = hourString?.split(",") || hourString;
        if (hoursToDelete.length > 0) {
            const delRes = await fetch(`/api/availability/${date}`, {
                method: "DELETE",
                body: JSON.stringify(hoursToDelete),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (delRes.ok) {
                saved = true;
                hoursToDelete = [];
                data = await delRes.json();
                alreadyAvailableHours = data?.hours;
                alreadyAvailableHours?.sort(
                    (a, b) => parseInt(a) - parseInt(b)
                );
                const checkBoxes = document.getElementsByName("removeCheckBox");
                checkBoxes.forEach((box) => {
                    box.checked = false;
                });
            } else {
                failed = true;
            }
        }
        if (alreadyAvailableHours && hourString && hourString !== "") {
            const putRes = await fetch(`/api/availability/${date}`, {
                method: "PUT",
                body: JSON.stringify({
                    hours,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (putRes.ok) {
                saved = true;
                data = await putRes.json();
                alreadyAvailableHours = data?.hours;
                alreadyAvailableHours?.sort(
                    (a, b) => parseInt(a) - parseInt(b)
                );
            } else {
                failed = true;
            }
        } else if (hourString && hourString !== "") {
            const postRes = await fetch(`/api/availability/${date}`, {
                method: "POST",
                body: JSON.stringify({
                    hours,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (postRes.ok) {
                saved = true;
                data = await postRes.json();
                alreadyAvailableHours = data?.hours;
                alreadyAvailableHours?.sort(
                    (a, b) => parseInt(a) - parseInt(b)
                );
            } else {
                failed = true;
            }
        }
    };

    const handleCheckbox = (event, hour) => {
        if (event.target.checked) {
            hoursToDelete.push(hour);
            hoursToDelete = hoursToDelete;
        } else {
            const index = hoursToDelete.indexOf(hour);
            hoursToDelete.splice(index, 1);
            hoursToDelete = hoursToDelete;
        }
    };
</script>

<main>
    <h1>Disponibilités</h1>
    {#if alreadyAvailableHours}
        <div class="available-container">
            <h3>Heures déjà disponibles :</h3> 
            {#each alreadyAvailableHours as hour}
            <p class="available-hours">
                {hour + "h "}
                <input
                    on:change={(e) => handleCheckbox(e, hour)}
                    type="checkbox"
                    name="removeCheckBox"
                /></p>
            {/each}
        </div>
    {/if}
    <label for="hours"
        >Écrire les heures dont vous souhaitez être disponible pour le <strong
            ><u>{date}</u></strong
        ></label
    >
    <input
        bind:value={hourString}
        name="hours"
        type="text"
        placeholder="11,12,13,14 ..."
    />
    <button on:click={handleClick}>SAUVEGARDER</button>
    {#if saved}
        <p class="success">Sauvegardé avec succès, vous pouvez quitter</p>
    {/if}
    {#if failed}
        <p class="failed">
            Échec de la sauvegarde, veuillez rafraichir et réassayer
        </p>
    {/if}
</main>

<style>
    main {
        flex: 6;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    label {
        margin: 3rem 0;
    }

    button {
        margin: 3rem 0;
        padding: 0.8rem;
        border: none;
        background-color: orangered;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        cursor: pointer;
    }

    .success {
        color: green;
    }

    .failed{
        color: red;
    }

    .available-hours{
        display: flex;
        flex-direction: column;
        margin: 0 0.3rem;
    }
    .available-container{
        display: flex;
        align-items: center;
    }

    @media screen and (max-width: 950px){
        .available-container{
            flex-direction: column;
        }
        .available-hours{
            flex-direction: row;
            margin: 0.3rem 0;
        }
    }
</style>
