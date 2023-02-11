mp.events.add('Player:Admin:ShowEntityBoxFromPlayers', (player) => {
    new EntityDimension(mp.players.local.vehicle);

    mp.events.add('render', drawBoundingBoxes);
});

mp.events.add('Player:Admin:HideEntityBoxFromPlayers', (player) => {
    mp.events.remove(['render']);
});

const boundingBoxes = [];

function drawBoundingBoxes() {
    for (const boundingBox of boundingBoxes) {
        const corners = boundingBox.getCorners();

        if (boundingBox.entity) {
            const c1 = boundingBox.entity.getOffsetFromInWorldCoords(
                corners[0].x,
                corners[0].y,
                corners[0].z
            );
            const c2 = boundingBox.entity.getOffsetFromInWorldCoords(
                corners[1].x,
                corners[1].y,
                corners[1].z
            );
            const c3 = boundingBox.entity.getOffsetFromInWorldCoords(
                corners[2].x,
                corners[2].y,
                corners[2].z
            );
            const c4 = boundingBox.entity.getOffsetFromInWorldCoords(
                corners[3].x,
                corners[3].y,
                corners[3].z
            );
            const c5 = boundingBox.entity.getOffsetFromInWorldCoords(
                corners[4].x,
                corners[4].y,
                corners[4].z
            );
            const c6 = boundingBox.entity.getOffsetFromInWorldCoords(
                corners[5].x,
                corners[5].y,
                corners[5].z
            );
            const c7 = boundingBox.entity.getOffsetFromInWorldCoords(
                corners[6].x,
                corners[6].y,
                corners[6].z
            );
            const c8 = boundingBox.entity.getOffsetFromInWorldCoords(
                corners[7].x,
                corners[7].y,
                corners[7].z
            );

            // top
            mp.game.graphics.drawLine(c1.x, c1.y, c1.z, c2.x, c2.y, c2.z, 255, 0, 0, 255);
            mp.game.graphics.drawLine(c2.x, c2.y, c2.z, c3.x, c3.y, c3.z, 255, 0, 0, 255);
            mp.game.graphics.drawLine(c3.x, c3.y, c3.z, c4.x, c4.y, c4.z, 255, 0, 0, 255);
            mp.game.graphics.drawLine(c4.x, c4.y, c4.z, c1.x, c1.y, c1.z, 255, 0, 0, 255);

            // bottom
            mp.game.graphics.drawLine(c5.x, c5.y, c5.z, c6.x, c6.y, c6.z, 0, 0, 255, 255);
            mp.game.graphics.drawLine(c6.x, c6.y, c6.z, c7.x, c7.y, c7.z, 0, 0, 255, 255);
            mp.game.graphics.drawLine(c7.x, c7.y, c7.z, c8.x, c8.y, c8.z, 0, 0, 255, 255);
            mp.game.graphics.drawLine(c8.x, c8.y, c8.z, c5.x, c5.y, c5.z, 0, 0, 255, 255);

            // sides
            mp.game.graphics.drawLine(c1.x, c1.y, c1.z, c5.x, c5.y, c5.z, 0, 255, 0, 255);
            mp.game.graphics.drawLine(c2.x, c2.y, c2.z, c6.x, c6.y, c6.z, 0, 255, 0, 255);
            mp.game.graphics.drawLine(c3.x, c3.y, c3.z, c7.x, c7.y, c7.z, 0, 255, 0, 255);
            mp.game.graphics.drawLine(c4.x, c4.y, c4.z, c8.x, c8.y, c8.z, 0, 255, 0, 255);
        }
    }
}

class EntityDimension {
    constructor(entity) {
        if (!entity || !entity.model) return;

        const { minimum, maximum } = mp.game.gameplay.getModelDimensions(entity.model);

        this.entity = entity;

        this.min = minimum;
        this.max = maximum;

        this.center = new mp.Vector3(
            (minimum.x + maximum.x) / 2,
            (minimum.y + maximum.y) / 2,
            (minimum.z + maximum.z) / 2
        );
    }

    getCorners() {
        let corners = [];

        corners[0] = new mp.Vector3(this.min.x, this.max.y, this.max.z);
        corners[1] = new mp.Vector3(this.max.x, this.max.y, this.max.z);
        corners[2] = new mp.Vector3(this.max.x, this.min.y, this.max.z);
        corners[3] = new mp.Vector3(this.min.x, this.min.y, this.max.z);
        corners[4] = new mp.Vector3(this.min.x, this.max.y, this.min.z);
        corners[5] = new mp.Vector3(this.max.x, this.max.y, this.min.z);
        corners[6] = new mp.Vector3(this.max.x, this.min.y, this.min.z);
        corners[7] = new mp.Vector3(this.min.x, this.min.y, this.min.z);

        return corners;
    }

    getCenterWorldOffset() {
        return this.entity.getOffsetFromInWorldCoords(this.center.x, this.center.y, this.center.z);
    }

    drawBoundingBox() {
        boundingBoxes.push(this);
    }

    removeBoundingBoxDraw() {
        const idx = boundingBoxes.indexOf(this);
        if (idx != -1) {
            boundingBoxes.splice(idx, 1);
        }
    }
}
