<script context="module">
    export async function load({ params }) {
        const location = params.location;

        return {
            props: {
                location,
            },
        };
    }
</script>

<script>
    /* ---->  TODO: If location is in carousel, do not permit adding title and content  <---------------------------------- */

    export let location;
    let title;
    let content;
    let image = "";
    let imageName;
    let uploaded;
    let imageUrl;
    let saved;
    let id;
    let selected = false;

    const handleUpload = async (e) => {
        await preSave();
        const newFormData = new FormData();
        newFormData.append("image", image);
        newFormData.append("imageName", imageName);
        const res = await fetch('/api/image',{
            method: "POST",
            body: newFormData,
        });
        if(res.ok){
            uploaded = true;
            imageUrl = await res.json();
            handleSave();
        }
    };

    const handleSave = async () => {
        if(selected){
            const res = await fetch(`/api/content/${location}/${id}`, {
                method: "PUT",
                body: JSON.stringify({ title, content, image: imageUrl ? imageUrl : image }),
            });
            if (res.ok) {
                saved = true;
            }
        } else{
            const res = await fetch(`/api/content/${location}`, {
            method: "POST",
            body: JSON.stringify({ location, title, content }),
        });
        }

    };

    const preSave = async () => {
        const res = await fetch(`/api/content/${location}`, {
            method: "POST",
            body: JSON.stringify({ location }),
        });
        if (res.ok) {
            const preData = await res.json();
            id = preData._id;
            const fileExtension = image.name.split(".")[1];
            const fileName = id + "." + fileExtension;
            imageName = fileName;
        }
    };

    const handleImageInput = (e) => {
        image = e.target.files[0];
        selected = true;
    };
</script>

<main>
    {#if location === "a-propos" || location === "acceuil" || location === "reservations"}
        <div class="row">
            <input type="text" placeholder="Nouveau titre" bind:value={title} />
        </div>
        <div class="row">
            <textarea
                name="content"
                placeholder="Nouveau contenu"
                id=""
                cols="30"
                rows="10"
                bind:value={content}
            />
        </div>
        <div class="row">
            <input
                type="file"
                name="image"
                on:change={(e) => handleImageInput(e)}
            />
        </div>
        <button on:click={() => selected ? handleUpload() : handleSave()}>SAVE</button>
    {:else}
        <div class="row">
            <input
                type="file"
                name="image"
                on:change={(e) => handleImageInput(e)}
            />
        </div>
        <button on:click={handleUpload}>SAVE</button>
    {/if}
    {#if uploaded}
        <p class="saved">Téléchargé avec succès, attendez la sauvegarde...</p>
    {/if}
    {#if saved}
        <p class="saved">Sauvegardé avec succès, vous pouvez quitter</p>
    {/if}
</main>

<style>
    main {
        flex: 6;
    }
    .row {
        display: flex;
        align-items: center;
    }
</style>
