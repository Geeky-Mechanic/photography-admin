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

    let alreadyAvailableHours = data[0]?.hours;
    alreadyAvailableHours?.sort((a,b) => parseInt(a)- parseInt(b));  

    const dateParts = date.split("-");
    const year = dateParts[0];
    const month = parseInt(dateParts[1]) - 1;
    const day = dateParts[2];

    // query formatting vars

    let hourString;
    let hours;

    // conditionnal display vars

    let saved = false;

    const handleClick = async () => {
        saved = false;
        hours = hourString.split(",") || hourString;
        if (alreadyAvailableHours) {
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
                alreadyAvailableHours?.sort((a,b) => parseInt(a)- parseInt(b));
            }
        } else {
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
                alreadyAvailableHours?.sort((a,b) => parseInt(a)- parseInt(b));  
            }
        }
    };
</script>

<main>
    <h1>Disponibilités</h1>
    {#if alreadyAvailableHours}
        <p>
            Heures déjà disponibles : {#each alreadyAvailableHours as hour}{hour +
                    "h "}{/each}
        </p>
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
</style>
