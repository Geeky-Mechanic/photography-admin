<script context="module">
    export async function load({ params, fetch }) {
        const age = params.age;
        const id = params.id;

        const res = await fetch(`/api/messages/${age}/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        return {
            props: {
                data,
                age,
                id,
            },
        };
    }
</script>

<script>
    export let data;
    export let age;
    export let id;

    let answerSuccess;
    let answerError;

    const handleClick = async () => {
        answerError = false;
        answerSuccess = false;
        const res = await fetch(`/api/messages/${age}/${id}`, {
            method: "PUT",
            body: JSON.stringify({ answered: true }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            answerSuccess = true;
        } else {
            answerError = true;
        }
    };
</script>

<main>
    <h1>Nom :</h1>
    <h1>{data.name} {data.lName}</h1>
    <hr />
    <h1>Courriel :</h1>
    <h2>{data.email}</h2>
    <hr />
    <h1>Date de communication :</h1>
    <h3>{new Date(data.date)}</h3>
    <hr />
    <h1>Sujet :</h1>
    <h3>{data.subj}</h3>
    <hr />
    <h1>Message :</h1>
    <p>{data.desc}</p>
    <hr />
    {#if age === "nouveaux"}
        <a
            href={`mailto:${data.email}?subject=RE:%20${data.subj}&body=%0A%0A%0AMessage%20du%20client%20:%0A${data.desc}`}
            on:click={handleClick}>REPONDRE</a
        >
    {/if}
    {#if answerSuccess}
        <p class="success">
            Le message est sauvegardé en tant que message répondu
        </p>
    {/if}
    {#if answerError}
        <p class="error">
            Une erreur est survenue lors de la sauvegarde en tant que message
            répondu, veuillez réassayer plus tard...
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

    hr {
        width: 90%;
    }

    a {
        text-decoration: none;
        padding: 0.8rem;
        border: none;
        background-color: orangered;
        border-radius: 5px;
        color: white;
        font-weight: 600;
    }

    .success {
        color: green;
    }

    .error {
        color: red;
    }
</style>
