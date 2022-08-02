<script>
    import "../styles/global.css";
    import Sidebar from "$lib/Sidebar.svelte";
    const items = [
        {
            name: "Contenu",
            ref: "",
            subItems: [
                { subName: "Famille", subRef: "contenu/famille" },
                { subName: "Grossesses", subRef: "contenu/grossesses" },
                { subName: "Événements", subRef: "contenu/evenements" },
                { subName: "À-propos", subRef: "contenu/a-propos"},
                { subName: "Acceuil", subRef: "contenu/acceuil"},

            ],
        },
    ];
</script>

<main>
    <Sidebar {items} />
    <slot />
</main>

<style>
    main {
        display: flex;
    }
</style>
