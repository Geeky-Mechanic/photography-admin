<script>
    import "../../styles/global.css";
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
        {
            name: "Messages",
            ref: "messages",
            subItems: [
                {subName: "Anciens Messages", subRef: "messages/anciens"},
                {subName: "Nouveaux Messages", subRef: "messages/nouveaux"}
            ]
        }
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
