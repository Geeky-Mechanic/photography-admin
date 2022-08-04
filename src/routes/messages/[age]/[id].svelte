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
            },
        };
    }
</script>

<script>
    export let data;
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
    <a href={`mailto:cindy_brousseau@hotmail.com?subject=RE:%20${data.subj}&body=%0A%0A${data.desc}`}>REPONDRE</a>
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

    a{
        text-decoration: none;
        padding: 0.8rem;
        border: none;
        background-color: orangered;
        border-radius: 5px;
        color: white;
        font-weight: 600;
    }
</style>
