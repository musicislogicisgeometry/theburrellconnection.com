declare module "astro:actions" {
	type Actions = typeof import("/Users/alessandro/src/ts/theburrellconnection.com/src/actions")["server"];

	export const actions: Actions;
}