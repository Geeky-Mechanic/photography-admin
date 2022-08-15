<script context="module">
    export async function load({params, fetch}){
        const res = await fetch(`/api/booking/${params.id}`)

        const data = await res.json()

        return {
            props: {
                data,
            }
        }
    };
</script>

<script>
    export let data;

    const handleClick = async (e) => {

    };
</script>

<main>
    <h1>Nom :</h1>
    <h1>{data.name} {data.lastName}</h1>
    <hr />
    <h1>Courriel :</h1>
    <h2>{data.email}</h2>
    <h1>Numéro de téléphone :</h1>
    <h2>{data.phoneNumber}</h2>
    <hr />
    <h1>Date du rendez-vous :</h1>
    <h3>{new Date(data.date).toLocaleString()}</h3>
    <hr />
    <h1>Addresse :</h1>
    <h3>{data.address} {data.streetName} {data.city}</h3>
    <hr />
    <h1>Description du contrat :</h1>
    <p>{data.description}</p>
    <hr />
    {#if !data.answered}
    <a href={`mailto:${data.email}?subject=Confimration%20du%20rendez%2Dvous&body=%0A%0A%0AMessage%20du%20client%20:%0A${data.description}`}
    on:click={handleClick}
    >CONFIRMER</a>
    {/if}
</main>

<style>
    main {
        flex: 6;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 3rem;
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
</style>