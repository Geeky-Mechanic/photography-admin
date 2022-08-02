<script context="module">
    export async function load({ params, fetch }) {
        const location = params.location;

        const res = await fetch(`/api/content/${location}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        return {
            props: {
                location,
                data,
            },
        };
    }
</script>

<script>
    import { goto } from "$app/navigation";
    export let location;
    export let data;
    let deletePrompt;

    const handleClick = (id, method) => {
        goto(`/contenu/${location}/${id}`);
    };

    const handleDelete = async (id) => {
        //have some sort of prompt to ensure the admin really wants to delete
        // maybe something like :'type "delete" to confirm you want to delete entry'
        //potentially have a multiple delete option later on
        if (deleteConfirm()) {
            const res = await fetch(`/api/content/${location}/${id}`, {
                method: "DELETE",
            });
            const deletedData = await res.json();
            const index = data.findIndex(
                (element) => element._id === deletedData._id
            );
            data.splice(index, 1);
            data = data;
        }
    };

    const deleteConfirm = () => {
        const answer = prompt(
            "Entre 'supprimer' pour confirmer la suppression de cet élément :"
        );
        if (answer === "supprimer") {
            return true;
        } else {
            return false;
        }
    };
</script>

<main>
    <h1>Content for location : {location}</h1>
    <button on:click={goto(`/contenu/${location}/nouveau`)}
        >ADD CONTENT</button
    >
    {#if location !== "a-propos"}
        {#each data as content}
            {#if content.title !== ""}
                <div class="container">
                    <h2>{content.title}</h2>
                    <p>{content.content}</p>
                    <button on:click={() => handleClick(content._id)}
                        >EDIT</button
                    >
                </div>
            {/if}
        {/each}
        {#each data as content}
            {#if content.title === ""}
                <div class="container">
                    <img src={content.image} alt="" />
                    <div class="btn-container">
                        <button on:click={() => handleClick(content._id)}
                            >EDIT</button
                        >
                        <button
                            class="delete"
                            on:click={() => handleDelete(content._id)}
                            >DELETE</button
                        >
                    </div>
                </div>
            {/if}
        {/each}
    {:else}
        {#each data as content}
            <div class="container">
                <h2>{content.title}</h2>
                <p>{content.content}</p>
                <img src={content.image} alt="" />
                <div class="btn-container">
                    <button on:click={() => handleClick(content._id)}
                        >EDIT</button
                    >
                    <button
                        class="delete"
                        on:click={() => handleDelete(content._id)}
                        >DELETE</button
                    >
                </div>
            </div>
        {/each}
    {/if}
</main>

<style>
    main {
        flex: 6;
    }
    img {
        max-width: 20rem;
    }
    button {
        margin: 1rem 0;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
