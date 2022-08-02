<script context="module">
    export async function load({ params, fetch }) {
        const id = params.id;
        const location = params.location;
        const res = await fetch(`/api/content/${location}/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        return {
            props: {
                id,
                location,
                data,
            },
        };
    }
</script>

<script>
    export let location;
    export let id;
    export let data;
    let title = data.title;
    let content = data.content;
    let image = data.image;
    let uploaded;
    let imageUrl;
    let imageName;
    let saved;

    const handleUpload = async (e) => {
        const newFormData = new FormData();
        newFormData.append("image", image);
        newFormData.append("imageName", imageName);
        const res = await fetch('/api/image',{
            method: "POST",
            body: newFormData,
        });
        console.log(await res.json());
    };

    const handleSave = async () => {
        if (!uploaded && image !== data.image) {
            return false;
        } else {
            const res = await fetch(`/api/content/${location}/${id}`, {
                method: "PUT",
                body: JSON.stringify({ title, content, image: imageUrl }),
            });
            if (res.ok) {
                saved = true;
                const newContent = await res.json();
                data = newContent;
            }
        }
    };

    const handleImageInput = (e) => {
        image = e.target.files[0];
        console.log(image);
        const fileExtension = e.target.files[0].name.split(".")[1];
        const fileName = id + "." + fileExtension;
        imageName = fileName;
    };
</script>

<main>
    <div class="row">
        <h2>ID : {data._id}</h2>
    </div>
    {#if title !== ""}
        <div class="row">
            <p>Titre :</p>
            <input type="text" placeholder="Nouveau titre" bind:value={title} />
        </div>
    {/if}

    {#if content !== ""}
        <div class="row">
            <p>Contenu :</p>
            <textarea
                name="content"
                placeholder="Nouveau contenu"
                id=""
                cols="30"
                rows="10"
                bind:value={content}
            />
        </div>
    {/if}

    {#if image !== ""}
        <div class="row">
            <img src={data.image} alt="" />
            <input
                type="file"
                name="image"
                on:change={(e) => handleImageInput(e)}
            />
        </div>
    {/if}
    <button on:click={handleUpload}>SAVE</button>
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
        display: flex;
        flex-direction: column;
    }
    img {
        max-width: 20rem;
    }
    button {
        width: 10rem;
        margin-left: 2rem;
    }
    .row {
        display: flex;
        align-items: center;
        margin: 2rem;
    }
</style>
