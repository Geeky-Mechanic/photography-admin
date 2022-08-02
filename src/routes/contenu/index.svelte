<script context="module">
    export async function load({fetch}){
        const res = await fetch(`/api/content`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if(res.ok){
        return {
          props: {
            data,
          },
        };
      };
    };
</script>

<script>
    export let data;

    const handleClick = (location) => {
        console.log(location);
    };
</script>

<main>
    {#each data as content}
        <h2 class="content-title">{content.title}</h2>
        <p class="content-text">{content.content}</p>
        <p>{content.location}</p>
        <img src={content.image} alt="">
        <button on:click={()=> handleClick(content.location)}>VIEW</button>
    {/each}
</main>

<style>
    main{
        display: flex;
        flex-direction: column;
        flex: 6;
        align-items: center;
    }
    img{
        max-width: 30rem;
    }
</style>