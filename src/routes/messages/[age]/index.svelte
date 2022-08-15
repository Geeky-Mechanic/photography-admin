<script context="module">
    export async function load({ params, fetch }) {
        const age = params.age;

        const res = await fetch(`/api/messages/${age}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        const numRes = await fetch(`/api/messages/${age}/number`,{
            headers: {
                "Content-Type": "application/json",
            },
        });

        const numMessages = await numRes.json();

        return {
            props: {
                age,
                data,
                numMessages,
            },
        };
    }
</script>

<script>
    import { goto } from "$app/navigation";
    import PageNbr from "$lib/PageNbr.svelte";
    export let age;
    export let data;
    export let numMessages;
    let currPage = 1;

    const handlePageNavigate = async (e) => {
    const skipNum = (parseInt(e.target.value) - 1) * 10;
    const btnId = e.target.name;
    if(btnId === "UpcomingId"){
     const res = await fetch(`/api/messages/${age}`, {
      headers: {
        "Content-Type": "application/json",
        skip: skipNum,
      },
    });
    const newData = await res.json();
    numMessages = newData;
    currPage = parseInt(e.target.value);
  };
  };

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
    <PageNbr id="UpcomingId" {currPage} number={numMessages} on:click={handlePageNavigate} />
</main>

<style>
    main {
        flex: 6;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2rem 0;
    }

    hr {
        width: 90%;
    }

    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid #fff;
        border-radius: 5px;
        padding: 5%;
        margin: 0 2rem 2rem 2rem;
    }
</style>
