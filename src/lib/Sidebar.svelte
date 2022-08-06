<script>
    import { goto, prefetch } from "$app/navigation";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { browser } from '$app/env';
    export let items;
    let activeItem;
    let display = "none";
    let clickedId;
    let leftDistance;
    let topDistance = [];
    let navItems;

    function validateName(name) {
        const found = items.find((item) => {
            return item.name === name;
        });
        if (found) {
            return true;
        } else {
            return false;
        }
    }

    const handleClick = (e) => {
        const id = e.target.id;
        const bar = document.getElementsByClassName("navbar")[0];
        leftDistance = bar.offsetWidth;
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
        }
    };

    /* ---->  GEt Y position for item to align the subitems with it  <---------------------------------- */
    onMount(()=> {
        if(browser){
        const bar = document.getElementsByClassName("navbar")[0];
        leftDistance = bar.offsetWidth;

        navItems = Array.from(document.getElementsByClassName("nav-item"));
        navItems.forEach(item => {
            const topDist = item.getBoundingClientRect().top;
            topDistance.push(topDist);
            topDistance = topDistance;
        });
        };
    });

    

    
</script>

<div class="navbar">
    <div class="nav-left">
        <img src="https://firebasestorage.googleapis.com/v0/b/photography-app-9dbd7.appspot.com/o/logo-cin-noir.png?alt=media&token=76606cc4-8548-4550-b49b-89411656d070" 
        alt="LOGO" class="nav-logo" />
    </div>
    {#each items as item, index}
        {#if item.subItems}
            <div
                class="nav-item"
                id={item.name}
                on:click={(e) => handleClick(e)}
            >
                <p id={item.name} class:active={item.name === activeItem}>
                    {item.name}
                </p>
            </div>
            <div class="subitem-wrapper" style={`left: ${leftDistance}px; top: ${topDistance[index]}px;`}>
                {#each item.subItems as subItem}
                    <div
                        class="nav-subitem"
                        id={`/${subItem.subRef}`}
                        on:click={handleClick}
                        on:mouseenter={() => prefetch(`/${subItem.subRef}`)}
                        style={`display: ${
                            clickedId === item.name ? display : "none"
                        };`}
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
            </div>
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
        margin: 0 0 0 0;
        position: sticky;
        top:0;
        background-color: lightgrey;
        border-right: 2px solid lightslategrey;
        /* --->  choose right color and style better  <--- */
    }

    .nav-logo {
        max-width: 10rem;
    }

    .nav-left {
        padding: 10px;
    }

    .active {
        border-bottom: 2px solid crimson;
    }

    .nav-item {
        background-color: rgba(255, 69, 0, 0.7);
        cursor: pointer;
        text-align: center;
        padding: 25px 10px;
    }

    .subitem-wrapper{
        position: absolute;
        top: 0;
    }

    .nav-subitem {
        background-color: lightskyblue;
        cursor: pointer;
        text-align: center;
        align-items: center;
        padding: 25px 10px;
        justify-content: center;
    }

    @media screen and (max-width: 550px) {
        .nav-logo{
            max-width: 7rem;
        }
    }

    @media screen and (max-width: 450px) {
        .nav-logo{
            max-width: 6rem;
        }
    }
</style>
