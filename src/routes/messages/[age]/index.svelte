<script context="module">
    export async function load({ params, fetch }) {
        const age = params.age;

        const res = await fetch(`/api/messages/${age}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        return {
            props: {
                age,
                data,
            },
        };
    }
</script>

<script>
    import { goto } from "$app/navigation";
    export let age;
    export let data;
    console.log(data);
    const handleClick = (id) => {
        goto(`/messages/${age}/${id}`);
    };
</script>

<main>
    {#each data as msg}
        <div class="container">
            <h1>Nom :</h1>
            <h1>{msg.name} {msg.lName}</h1>
            <hr />
            <h1>Date de communication :</h1>
            <h3>{new Date(msg.date)}</h3>
            <hr />
            <h1>Sujet :</h1>
            <h3>{msg.subj}</h3>
            <hr />
            <button on:click={() => handleClick(msg._id)}>VOIR</button>
        </div>
    {/each}
</main>

<style>
    main {
        flex: 6;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 2rem;
    }

    hr {
        width: 90%;
    }

    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid #000;
        border-radius: 5px;
        padding: 5%;
        margin-bottom: 2rem;
    }
</style>
