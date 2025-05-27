export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('sync_events', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        device_id: {
            type: Sequelize.UUID,
            allowNull: false
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false
        },
        total_files_synced: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        total_errors: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        internet_speed: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()')
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()')
        }
    });
}

export async function down(queryInterface) {
    await queryInterface.dropTable('sync_events');
}
