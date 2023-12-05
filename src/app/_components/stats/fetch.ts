import {
	constructBlogService
} from "@/services/blog/blog.module";
import {
	Skill
} from "@/components/grid/skills/skills";

type SkillDisplay = {
	name: string
	modules_used: Skill[]
	at_projects: Skill["featured"][]
}

type Dependency = {
	Name: string
	Description: string
	URL: string
	icon: {
		type: "emoji" | "image"
		[key: string]: any
	}
	external: any[]
}

function getIcon(image: any) {
	if (image.type === "emoji") {
		return image.emoji;
	} else if (image.type === "external") {
		return image.external.url;
	} else if (image.type === "file") {
		return image.file.url;
	} else {
		return image;
	}
}

function getSkill(
	external_deps: Dependency,
	key: string
): Skill {
	return {
		title: external_deps.Name,
		description: external_deps.Description,
		url: external_deps.URL,
		image_type: external_deps.icon.type as Dependency["icon"]["type"],
		image: getIcon(external_deps.icon),
		category: key,
		featured: external_deps.external,
	}
}

export async function fetchSkills(): Promise<SkillDisplay[]> {
    "use server";
    const blog_service = constructBlogService({
        next: { revalidate: 4000 }
    });
    const external_deps: {[key: string]: Skill[]} = await blog_service.getGroupedExternalDeps(getSkill);
    const skillDisplays = Object.keys(external_deps).map(key => {
        const at_projects: Skill["featured"] = [];
        const already_added: string[] = [];
        external_deps[key].forEach((module) => {
            module.featured.forEach((project) => {
                if (!already_added.includes(project.title)) {
                    at_projects.push(project);
                    already_added.push(project.title);
                }
            });
        });
        return {
            name: key,
            modules_used: external_deps[key],
            at_projects: at_projects,
        };
    });
	skillDisplays.sort((a, b) => {
		return b.modules_used.length - a.modules_used.length;
	});
    return skillDisplays;
}