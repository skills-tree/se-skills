const skillsTreeJson =
    {
        "chart": {
            "container": "#skills-tree",
            "rootOrientation": "WEST",
            "hideRootNode": true,
            "connectors": {
                "type": "bCurve"
            }
        },
        "nodeStructure": {
            "text": {
                "name": "Java"
            },
            "children": [
                {
                    "innerHTML": "<div onclick='obtainSkill(\"3194e1dd-fb11-48d4-bd84-3ead7b8302c8\", 1)' level='1'>Concurrency</div>",
                    "children": [],
                    "HTMLid": "3194e1dd-fb11-48d4-bd84-3ead7b8302c8"
                },
                {
                    "innerHTML": "<div onclick='obtainSkill(\"60de3b0e-f54f-408a-90a8-ed0cb7ea6753\", 1)'>RDB</div>",
                    "children": [],
                    "HTMLid": "60de3b0e-f54f-408a-90a8-ed0cb7ea6753"
                },
                {
                    "innerHTML": "<div onclick='obtainSkill(\"5bd61962-ffa0-4fdf-97dc-92e98298a732\", 1)'>JVM</div>",
                    "children": [
                        {
                            "innerHTML": "<div onclick='obtainSkill(\"18367acc-6ac7-412e-94b8-199dde59da8c\", 1)'>JIT</div>",
                            "children": [
                                {
                                    "innerHTML": "<div onclick='obtainSkill(\"700d146a-b524-4e1c-87a5-0814768901a4\", 1)'>GC</div>",
                                    "children": [
                                        {
                                            "innerHTML": "<div onclick='obtainSkill(\"582705eb-b8fa-4585-ad78-23fed7d6f693\", 1)'>Profiling</div>",
                                            "children": [],
                                            "HTMLid": "582705eb-b8fa-4585-ad78-23fed7d6f693"
                                        }
                                    ],
                                    "HTMLid": "700d146a-b524-4e1c-87a5-0814768901a4"
                                }
                            ],
                            "HTMLid": "18367acc-6ac7-412e-94b8-199dde59da8c"
                        }
                    ],
                    "HTMLid": "5bd61962-ffa0-4fdf-97dc-92e98298a732"
                },
                {
                    "innerHTML": "<div onclick='obtainSkill(\"ad32878b-5afd-47f1-a9e3-d760d3fb3fde\", 1)'>Language</div>",
                    "children": [
                        {
                            "innerHTML": "<div onclick='obtainSkill(\"8b801c39-d54a-41f9-8fb7-c8d131e35ab6\", 1)'>Collections</div>",
                            "children": [
                                {
                                    "innerHTML": "<div onclick='obtainSkill(\"a9e953b5-fc27-4df6-b071-b81a4a06b84e\", 1)'>Stream API</div>",
                                    "children": [],
                                    "HTMLid": "a9e953b5-fc27-4df6-b071-b81a4a06b84e"
                                }
                            ],
                            "HTMLid": "8b801c39-d54a-41f9-8fb7-c8d131e35ab6"
                        }
                    ],
                    "HTMLid": "ad32878b-5afd-47f1-a9e3-d760d3fb3fde"
                },
                {
                    "innerHTML": "<div onclick='obtainSkill(\"e28e4a02-4eeb-48ac-8888-1ac76b6e3413\", 1)'>Reactive</div>",
                    "children": [],
                    "HTMLid": "e28e4a02-4eeb-48ac-8888-1ac76b6e3413"
                }
            ]
        }
    }
