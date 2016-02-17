class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.integer :todo_id, null: false, index: true
      t.string :body, null: false
      t.boolean :done, null: false
      t.timestamps null: false
    end
  end
end
