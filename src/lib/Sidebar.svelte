<script>
    import { goto, prefetch } from "$app/navigation";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    export let items;
    let activeItem;
    let display = "none";
    let clickedId;
    /*     onMount(()=> {
        if($page.url.pathname === "/dashboard"){
            activeItem = "Dashboard";
        } else if ($page.url.pathname === "/dashboard/bookings") {
            activeItem = "Bookings";
        } else if ($page.url.pathname === "/dashboard/contact"){
            activeItem = "Complaints";
        } else if ($page.url.pathname === "/dashboard/pastbookings"){
            activeItem = "PastBookings";
        };
    }); */

    function validateName(name){
        const found = items.find(item => {
            return item.name === name
        });
        if(found){
            return true;
        } else{
            return false;
        }
    };

    const handleClick = (e) => {
        const id = e.target.id;
        if (validateName(id)) {
            clickedId = id;
            if (display === "none") {
                display = "flex";
            } else if (display === "flex") {
                display = "none";
            }
        } else {
            display = "none";
            goto(id);
        };
    };
</script>

<div class="navbar">
    <div class="nav-left">
        <span class="nav-logo">Logo</span>
    </div>
    {#each items as item}
        {#if item.subItems}
            <div class="nav-item" id={item.name} on:click={(e) => handleClick(e)}>
                <p id={item.name} class:active={item.name === activeItem}>
                    {item.name}
                </p>
            </div>
            {#each item.subItems as subItem}
                <div
                    class="nav-subitem"
                    id={`/${subItem.subRef}`}
                    on:click={handleClick}
                    on:mouseenter={() => prefetch(`/${item.ref}`)}
                    style={`display: ${clickedId === item.name ? display : "none"};`}
                >
                    <p
                        class="subitem-text"
                        id={`/${subItem.subRef}`}
                        on:click={handleClick}
                    >
                        {subItem.subName}
                    </p>
                </div>
            {/each}
        {:else}
            <div
                class="nav-item"
                on:click={() => {
                    activeItem = item.name;
                    goto(`/${item.ref}`);
                }}
                on:mouseenter={() => prefetch(`/${item.ref}`)}
            >
                <p class:active={item.name === activeItem}>{item.name}</p>
            </div>
        {/if}
    {/each}
</div>

<style>
    .navbar {
        flex: 1;
        height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: crimson;
        margin: 0 0 0 0;
        /* --->  choose right color and style better  <--- */
    }

    .nav-logo {
        font-weight: 800;
        font-size: 3rem;
    }

    .nav-left {
        padding: 10px;
    }

    .active {
        border-bottom: 2px solid crimson;
    }

    .nav-item {
        background-color: lightskyblue;
        cursor: pointer;
        text-align: center;
        padding: 25px 10px;
    }

    .nav-subitem {
        background-color: lightskyblue;
        cursor: pointer;
        text-align: center;
        align-items: center;
        padding: 25px 10px;
        position: relative;
        left: 100%;
        top: -11%;
        justify-content: center;
    }
</style>
